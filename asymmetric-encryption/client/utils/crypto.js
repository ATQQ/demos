import JSEncrypt from 'jsencrypt'

const pubKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0YiWffUFPnr2OyfcaM8QLkdq3
0VQxjIctZJX/CnYn7NorwCyKiBX3hULSUrBxBACZBtfeGtpT+I9yn3+6s4kClZiJ
NOOP8bvJab4fboLUtJt9XciKENRxHVcnrYMrM+0diXGH/COjeA7ym/L2M/eX1fxp
ZjTByaJdx0FZAlrD4wIDAQAB
-----END PUBLIC KEY-----
`
export function publicEncrypt(str){
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(pubKey)
    return encrypt.encrypt(str)
}
