import { getCommentList, approveComment, rejectComment, deleteComment } from '../comment'
import request from '../../utils/request'

// Mock request
jest.mock('../../utils/request')

// Mock vue-router
jest.mock('vue-router', () => ({
  createRouter: jest.fn(),
  createWebHistory: jest.fn(),
  createMemoryHistory: jest.fn()
}))

// Mock pinia
jest.mock('pinia')

describe('评论API服务', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getCommentList', () => {
    it('应该成功获取评论列表', async () => {
      const mockResponse = {
        code: 0,
        data: {
          list: [
            {
              id: 1,
              content: '测试评论',
              author: '测试用户',
              status: 'pending'
            }
          ],
          total: 1
        }
      }
      request.mockResolvedValue(mockResponse)

      const params = {
        page: 1,
        pageSize: 10,
        postTitle: '测试文章',
        author: '测试用户',
        status: 'pending'
      }

      const result = await getCommentList(params)

      expect(request).toHaveBeenCalledWith({
        url: '/comments',
        method: 'get',
        params
      })
      expect(result).toEqual(mockResponse.data)
    })

    it('应该在请求失败时抛出错误', async () => {
      const mockResponse = {
        code: 1,
        message: '获取评论列表失败'
      }
      request.mockResolvedValue(mockResponse)

      await expect(getCommentList({})).rejects.toThrow('获取评论列表失败')
    })
  })

  describe('approveComment', () => {
    it('应该成功通过评论', async () => {
      const mockResponse = {
        code: 0,
        data: null
      }
      request.mockResolvedValue(mockResponse)

      await approveComment(1)

      expect(request).toHaveBeenCalledWith({
        url: '/comments/1/approve',
        method: 'put'
      })
    })

    it('应该在请求失败时抛出错误', async () => {
      const mockResponse = {
        code: 1,
        message: '操作失败'
      }
      request.mockResolvedValue(mockResponse)

      await expect(approveComment(1)).rejects.toThrow('操作失败')
    })
  })

  describe('rejectComment', () => {
    it('应该成功拒绝评论', async () => {
      const mockResponse = {
        code: 0,
        data: null
      }
      request.mockResolvedValue(mockResponse)

      await rejectComment(1)

      expect(request).toHaveBeenCalledWith({
        url: '/comments/1/reject',
        method: 'put'
      })
    })

    it('应该在请求失败时抛出错误', async () => {
      const mockResponse = {
        code: 1,
        message: '操作失败'
      }
      request.mockResolvedValue(mockResponse)

      await expect(rejectComment(1)).rejects.toThrow('操作失败')
    })
  })

  describe('deleteComment', () => {
    it('应该成功删除评论', async () => {
      const mockResponse = {
        code: 0,
        data: null
      }
      request.mockResolvedValue(mockResponse)

      await deleteComment(1)

      expect(request).toHaveBeenCalledWith({
        url: '/comments/1',
        method: 'delete'
      })
    })

    it('应该在请求失败时抛出错误', async () => {
      const mockResponse = {
        code: 1,
        message: '删除失败'
      }
      request.mockResolvedValue(mockResponse)

      await expect(deleteComment(1)).rejects.toThrow('删除失败')
    })
  })
}) 