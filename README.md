## template-dva-app
    - 集成dva数据流管理方案
    - 集成express，支持转发、实现基础服务等
    - 集成service-workers管理方案，支持离线应用、桌面应用
    - 公共代码切割缓存 业务代码按需加载
    - 有任何宝贵意见欢迎提出，邮箱地址beJoker7@yeah.net

### 构建代码
    - yarn build
    - yarn build:server && yarn build:client -w (-a 代表代码分析/-w 代表代码监听/-c 代表代码压缩)

### 备注
   调试service-workers功能，需在localhost或https环境下
