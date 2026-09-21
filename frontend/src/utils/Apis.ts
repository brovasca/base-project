const Apis = {
  API_HOST: process.env.REACT_APP_API_END_POINT || 'http://localhost:3001/api',
  API_TAILER: {
    BENH_NHAN: '/benhnhan',
    CAMPAIGN_NON: '/campaign-non',
    GET_POSTS: '/post/filter/v1',
    DM_LOAI_MAY: '/dmloaimay'
  },
};

export default Apis;
