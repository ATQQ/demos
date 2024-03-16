import fs from 'fs'
import path from 'path'
function copyDirectory(source, destination) {
  // 创建目标目录
  fs.mkdirSync(destination, { recursive: true });

  // 读取源目录内容
  const files = fs.readdirSync(source);

  // 遍历源目录内容
  files.forEach((file) => {
    const sourcePath = path.join(source, file);
    const destinationPath = path.join(destination, file);

    // 判断是否为文件夹
    if (fs.statSync(sourcePath).isDirectory()) {
      // 递归复制子目录
      copyDirectory(sourcePath, destinationPath);
    } else {
      // 复制文件
      fs.copyFileSync(sourcePath, destinationPath);
    }
  });
}

const dist = 'dist'
const copyDir = ['pages/png-compress']
const root = process.cwd()
copyDir.forEach(dir => {
  const source = path.join(root, dir)
  const destination = path.join(root, dist, dir.replace('pages/', ''))
  copyDirectory(source, destination)
})