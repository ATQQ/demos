const { JSEncrypt } = require('nodejs-jsencrypt')

const privKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXwIBAAKBgQC0YiWffUFPnr2OyfcaM8QLkdq30VQxjIctZJX/CnYn7NorwCyK
iBX3hULSUrBxBACZBtfeGtpT+I9yn3+6s4kClZiJNOOP8bvJab4fboLUtJt9XciK
ENRxHVcnrYMrM+0diXGH/COjeA7ym/L2M/eX1fxpZjTByaJdx0FZAlrD4wIDAQAB
AoGBAKarxU2vw4gZCdeE3/BzAmMaWrjcD2pVCZY0ya/Fb9WGMTSZtc4u3fU+Sbbi
tqtGYnMC8rUDpNZP5eOoYrIVL7MJFj7n5DIT6TJOxWRavWsei812pQlc6ccR/VEH
o0nN5JQRZH8DC+CE86QddOW7VfnRMIP4A7j8UEEiRxsPITExAkEA4N10W/HA7lYE
WKSRES4/gAJHg7cqS2dAWIovX/JtxzUyK2q50rWjbgbXXOGriIp3cRJeH2Jmi6tm
jQQ+ldWAqwJBAM1b/9cRLWJ6fPdDIjbrc9IQE6C5HYI0FsHuyCn3zUKnD1+hc7k5
+BrSpyG5VzdPH3WOhm6GJ5TCf/LlxvvIeakCQQCEO1Ywt2KYBTc7FVNFgifPVAfP
+gdCHi6lomUni/1oVuzwwSsTMMMxcY51zTM88Qg6Eu4MkKXy3lFI/cT8AXhPAkEA
vy4q27muGsQVmsvxClfgl2tIGpS7l/+OQDVgO1Hq0WZdtZXE+mexRqdd2NOHEoKi
svpgxHw4VRFNtH+d48EbIQJBAMcLRGOuUrPhyYXmvEvvGGqcFH7zwjoyYlQQYR3a
IeAC4Mo/vDo7agLXvlRFXgPWMXAJqzjVhZ+xmew4hUqe5HY=
-----END RSA PRIVATE KEY-----
`

function privDecrypt(str) {
    const encrypt = new JSEncrypt()
    encrypt.setPrivateKey(privKey)
    return encrypt.decrypt(str)
}

module.exports = {
    privDecrypt
}