import BaseRequest from '~/utils/request'

class MobileService extends BaseRequest {
  constructor() {
    super({
      hostKey: 'API_MAP_QQ'
    })
	}

	/**
	 * 逆地址解析
	 */
  geocoder(payload: {
    /**
     * 位置信息 格式 <latidude>,<longitude>
     */
    location: string,
    /**
     * 是否获取poi列表
     */
    get_poi: 1|0,
	}): Promise<any> {
    return this.jsonp({
      url: '/ws/geocoder/v1',
      data: {
        ...payload,
        key: APP_CONF.KEY_MAP_QQ,
        output: 'jsonp',
        callback: 'jsonhandle1'
      },
      resType: 1,
    })
  }
}

export default new MobileService() as MobileService
