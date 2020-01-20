module.exports = {
  apps : [{
    name: 'NEMV_2020_01',
    script: './be/bin/www',   // 실행 파일

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    // args: 'one two',
    // instances: 1,
    // autorestart: true,
    // watch: false,   // 코드 변화됐을 때 재시작
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_pr: {
      NODE_ENV: 'production',
      PORT: 80
    }
  }],

  // 서버에 실제 보낼 때
  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
