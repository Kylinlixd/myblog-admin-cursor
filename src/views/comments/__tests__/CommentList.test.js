import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import CommentList from '../CommentList.vue'
import { getCommentList, approveComment, rejectComment, deleteComment } from '../../../api/comment'

// Mock Element Plus
jest.mock('element-plus', () => {
  const mockSuccess = jest.fn()
  const mockError = jest.fn()
  const mockConfirm = jest.fn().mockResolvedValue()

  return {
    ElMessage: {
      success: mockSuccess,
      error: mockError
    },
    ElMessageBox: {
      confirm: mockConfirm
    }
  }
})

// Mock API
jest.mock('../../../api/comment', () => ({
  getCommentList: jest.fn(),
  approveComment: jest.fn(),
  rejectComment: jest.fn(),
  deleteComment: jest.fn()
}))

// Mock console.error
console.error = jest.fn()

describe('CommentList.vue', () => {
  let wrapper
  const mockComment = {
    id: 1,
    content: '测试评论',
    status: 'pending',
    postTitle: '测试文章',
    author: '测试用户',
    email: 'test@example.com',
    createTime: '2024-03-20 10:00:00'
  }

  beforeEach(() => {
    // 重置所有mock
    jest.clearAllMocks()
    
    // 设置默认的API响应
    getCommentList.mockResolvedValue({
      data: {
        list: [mockComment],
        total: 1
      }
    })
    
    // 创建组件实例
    wrapper = mount(CommentList, {
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          'el-icon': true,
          'el-button': true,
          'el-table': true,
          'el-table-column': true,
          'el-tag': true,
          'el-pagination': true,
          'el-card': true,
          'el-form': true,
          'el-form-item': true,
          'el-input': true,
          'el-select': true,
          'el-option': true,
          'el-button-group': true
        },
        directives: {
          loading: {
            mounted() {}
          }
        }
      }
    })
  })

  it('应该正确初始化组件', async () => {
    await wrapper.vm.$nextTick()
    expect(getCommentList).toHaveBeenCalledWith({
      page: 1,
      pageSize: 10,
      postTitle: '',
      author: '',
      status: ''
    })
    expect(wrapper.vm.comments).toEqual([mockComment])
    expect(wrapper.vm.total).toBe(1)
  })

  it('应该正确处理搜索', async () => {
    await wrapper.vm.$nextTick()
    wrapper.vm.filterForm.postTitle = '测试'
    wrapper.vm.filterForm.author = '用户'
    wrapper.vm.filterForm.status = 'pending'
    await wrapper.vm.handleSearch()
    expect(getCommentList).toHaveBeenCalledWith({
      page: 1,
      pageSize: 10,
      postTitle: '测试',
      author: '用户',
      status: 'pending'
    })
  })

  it('应该正确处理重置', async () => {
    await wrapper.vm.$nextTick()
    wrapper.vm.filterForm.postTitle = '测试'
    wrapper.vm.filterForm.author = '用户'
    wrapper.vm.filterForm.status = 'pending'
    await wrapper.vm.handleReset()
    expect(wrapper.vm.filterForm).toEqual({
      postTitle: '',
      author: '',
      status: ''
    })
    expect(getCommentList).toHaveBeenCalledWith({
      page: 1,
      pageSize: 10,
      postTitle: '',
      author: '',
      status: ''
    })
  })

  it('应该正确处理评论审核', async () => {
    await wrapper.vm.$nextTick()
    approveComment.mockResolvedValue({})
    await wrapper.vm.handleApprove(mockComment)
    await wrapper.vm.$nextTick()
    const { ElMessageBox, ElMessage } = require('element-plus')
    expect(ElMessageBox.confirm).toHaveBeenCalled()
    expect(approveComment).toHaveBeenCalledWith(mockComment.id)
    expect(ElMessage.success).toHaveBeenCalledWith('操作成功')
    expect(getCommentList).toHaveBeenCalled()
  })

  it('应该正确处理评论拒绝', async () => {
    await wrapper.vm.$nextTick()
    rejectComment.mockResolvedValue({})
    await wrapper.vm.handleReject(mockComment)
    await wrapper.vm.$nextTick()
    const { ElMessageBox, ElMessage } = require('element-plus')
    expect(ElMessageBox.confirm).toHaveBeenCalled()
    expect(rejectComment).toHaveBeenCalledWith(mockComment.id)
    expect(ElMessage.success).toHaveBeenCalledWith('操作成功')
    expect(getCommentList).toHaveBeenCalled()
  })

  it('应该正确处理评论删除', async () => {
    await wrapper.vm.$nextTick()
    deleteComment.mockResolvedValue({})
    await wrapper.vm.handleDelete(mockComment)
    await wrapper.vm.$nextTick()
    const { ElMessageBox, ElMessage } = require('element-plus')
    expect(ElMessageBox.confirm).toHaveBeenCalled()
    expect(deleteComment).toHaveBeenCalledWith(mockComment.id)
    expect(ElMessage.success).toHaveBeenCalledWith('删除成功')
    expect(getCommentList).toHaveBeenCalled()
  })

  it('应该在API调用失败时显示错误消息', async () => {
    getCommentList.mockRejectedValue(new Error('API错误'))
    await wrapper.vm.$nextTick()
    await wrapper.vm.getComments()
    expect(console.error).toHaveBeenCalledWith('获取评论列表失败:', expect.any(Error))
  })
})