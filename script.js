// script.js
import http from "k6/http";
import { check,sleep } from "k6";
  
export const options = {
  vus: 50,   // Virtual Users (동시 사용자)
  duration: "5s", // 테스트 시간 
};

// export default function () {
//   const url = "http://localhost:8443/users";
//   http.get(url);
//   sleep(1);
// }

const randomStrGen = () => Math.random().toString(36).substring(2);
const randomPhoneNumGet = () => {
  const phoneNum = Math.floor(1000000000 + Math.random() * 9000000000).toString();
  return phoneNum.substring(0, 3) + '-' + phoneNum.substring(3, 6) + '-' + phoneNum.substring(6)
}


export default function() {
  const url = 'https://bluecanvasapi.bluecanvas.com/auth/login';
  const body = JSON.stringify({
    // "name": randomStrGen(),
    // "email": `${randomStrGen()}@test.com`,
    // "phone": `${randomPhoneNumGet()}`,
    // "loginId": randomStrGen(),
    // "password": randomStrGen()
    "email": `awpgosu@gmail.com`,
    "pwd": 1111
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //   const url = "http://localhost:8443/users";
//   http.get(url);
  const res = http.post(url, body, params);
  check(res, {
    'status was 200': r => r.status === 200,
    'tx time OK': r => r.timings.duration < 500  // 값을 변경하면서 테스트 해보면 재미있긔~
  });
}