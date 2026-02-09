const globalSetup = () => {
  const argv = process.argv.join(' ')

  if (argv.includes('unit')) {
    console.log('\n🧪 단위 테스트 시작\n')
    return
  }
  if (argv.includes('ui') && !argv.includes('unit')) {
    console.log('\n🖥️ UI 테스트 시작\n')
    return
  }

  console.log('\n⏰ 전체 테스트 시작\n')
}

export default globalSetup
