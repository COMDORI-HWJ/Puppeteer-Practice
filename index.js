/**
 Created by WebStorm IDEA.
 *packageName    :
 * fileName       : index
 * author         : wj
 * date           : 2022/12/10
 * description    : Node.js Puppeteer 패키지를 이용한 웹 크롤링 연습
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2022/12/10        wj       최초 생성
 * 2022/12/15        wj       네이버 자동 로그인 기능 추가
 * 2022/12/16        wj       퍼피티어 함수 연습 및 마무리
 * 2023/02/28        wj       빙 AI를 이용하여 퍼핏티어 학습
 */

/**
참고
 https://devscb.tistory.com/70
 https://wickedmagica.tistory.com/144
 https://mycodings.fly.dev/blog/2022-07-30-how-to-handle-xpath-in-puppeteer
 */

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless:false, // 브라우저 실행 여부
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' // macOS 크롬 브라우저 경로

    }); // puppeteer 시작
    // const page = await browser.newPage() // 새로운 탭 생성
    // const page = await browser.pages()
    const page = (await browser.pages())[0];// 첫 번째 탭


    try{
        await page.goto('https://naver.com'); // 해당 페이지로 이동
    }catch (e) {
        const errorMsg = '오류 발생! \n 홈 페이지에 연결할 수 없습니다. 다시 확인 해주세요.'
        throw Error('브라우저를 실행할 수 없습니다: ' + e);
        console.log(errorMsg, e);
    }

    await page.bringToFront(); // 탭 전환
    await page.setViewport({ // 화면 크기 설정
        width: 1280, height: 1024
    });
    //await page.waitForNavigation();
    try {
        await page.click("#account > a"); // 클릭 이벤트
    } catch (e) {
        let errorMsg = '오류 발생! \n 클릭할 수 없습니다.'
        console.log(errorMsg, e);
    }
    try {// 네이버 자동 로그인
        await page.waitForTimeout(1000); // 네이버 아이디 입력전 대기
        // await page.$x("/html/body/div[1]/div[2]/div/div[1]/form/ul/li/div/div[1]/div[1]/input"); // XPath
        await page.type("#id", "test");// 네이버 아이디
        await page.waitForTimeout(1000);// 네이버 비밀번호 입력전 대기
        // await page.$x("/html/body/div[1]/div[2]/div/div[1]/form/ul/li/div/div[1]/div[2]/input");
        await page.type("#pw", "tt");// 네이버 비밀번호
    } catch (e) {
        let errorMsg = '오류 발생! \n 입력불가!'
        console.log(errorMsg, e);
    }
    await page.goto("https://google.com"); // 페이지 이동
    await page.goBack(); // 이전 페이지 이동
    await page.reload(); // 새로고침
    await page.goForward(); // 다음 페이지 이동


    await page.screenshot({ // 스크린샷
        path: 'Screenshot/1.png', fullPage:false
    });
    await page.close();  // 브라우저 종료
    await page.waitForTimeout(3000); // 네이버 아이디 입력전 대기


    /*
    * puppeteer는 크롬 브라우저를 실행하는 라이브러리이기 때문에 CPU와 RAM 점유율이 높을 수 있습니다.
    * puppeteer의 CPU와 RAM 점유율을 낮추는 방법은 다음과 같습니다.
    * puppeteer.launch() 함수에 옵션을 주어 헤드리스 모드로 실행하거나, 브라우저의 해상도나 프레임레이트를 낮추거나, GPU 가속을 비활성화하거나, 캐시를 비우거나, 확장 프로그램을 제거하거나 등등의 방법이 있습니다1.
puppeteer에서 사용하지 않는 페이지나 브라우저를 닫아주는 것도 중요합니다. page.close() 함수와 browser.close() 함수를 사용하여 메모리를 해제해주십시오2.
    * */
    /* puppeteer에서 브라우저를 닫으면 그 인스턴스는 더 이상 사용할 수 없습니다. 새로운 브라우저를 열려면 puppeteer.launch() 함수를 다시 호출해야 합니다.
       Puppeteer는 브라우저 인스턴스를 재사용할 수 있는 방법을 제공하지 않습니다1. 브라우저 인스턴스를 닫지 않고 여러 개의 페이지 객체를 생성하고 관리하는 것이 가능합니다. 하지만 브라우저 인스턴스를 닫았다가 다시 열려면 새로운 인스턴스를 생성해야 합니다.
브라우저 인스턴스를 재사용하려면 Puppeteer 대신 Selenium과 같은 다른 웹 자동화 툴을 사용하는 것이 좋습니다2. Selenium은 웹 드라이버 API를 통해 이미 실행중인 브라우저에 연결할 수 있습니다.
더 자세한 내용은 Selenium 공식 문서를 참고하세요.
    */

    const page2 = await browser.newPage();
    const page3 = await browser.newPage();


    await page2.goto("https://apple.com");
    await page3.close();




})();