import { screen, waitFor } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import render from "../../../lib/test/render"
import LoginForm from "../LoginForm"
import { testServer } from "@/mocks/testServer";

const navigateFn = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...actual,
      useNavigate: () => navigateFn,
    };
  });

describe('LoginForm', () => {

    describe('로그인 실패 테스트',()=>{
        beforeEach(()=>{
            vi.spyOn(window, 'alert').mockImplementation(() => {});
        });

        afterEach(()=>{
            vi.restoreAllMocks();
        });

        it('SI-01: 비밀번호 불일치 시 로그인 시도', async () => {
            testServer.use(
                http.post('*/api/member/login', () => {
                  return HttpResponse.json({
                    isSuccess: false,
                    code: 'ERROR',
                    message: '비밀번호가 일치하지 않습니다.'
                  }, { status: 404 });
                })
              );
            const {user} = await render(<LoginForm />)

            const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
            const passwordInput = screen.getByPlaceholderText('비밀번호를 입력해주세요.');
            const submitButton = screen.getByRole('button', { name: '로그인' });

            
            await user.type(emailInput, 'test@test.com');
            await user.type(passwordInput, 'test1234');
    

            await user.click(submitButton);

            await waitFor(() => {
                expect(window.alert).toHaveBeenCalledWith('비밀번호가 일치하지 않습니다.');
            }, { timeout: 3000 });
        });
        it('SI-02: 존재하지 않는 계정으로 로그인 시도', async () => {
            testServer.use(
                http.post('*/api/member/login', () => {
                  return HttpResponse.json({
                    isSuccess: false,
                    code: 'ERROR',
                    message: '등록되지 않은 이메일 입니다.'
                  }, { status: 404 });
                })
              );
            const {user} = await render(<LoginForm />)

            const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
            const passwordInput = screen.getByPlaceholderText('비밀번호를 입력해주세요.');
            const submitButton = screen.getByRole('button', { name: '로그인' });

            
            await user.type(emailInput, 'test@test.com');
            await user.type(passwordInput, 'test1234');
    

            await user.click(submitButton);

            await waitFor(() => {
                expect(window.alert).toHaveBeenCalledWith('등록되지 않은 이메일 입니다.');
            }, { timeout: 3000 });
        });
    })
    
    describe('로그인 유효성 검사 테스트',()=>{
        it('SI-03: 이메일 미입력 상태에서 로그인 시도', async() => {
            const {user} = await render(<LoginForm />)

            const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
            const passwordInput = screen.getByPlaceholderText('비밀번호를 입력해주세요.');
            const submitButton = screen.getByRole('button', { name: '로그인' });

            await user.click(emailInput);
            await user.click(passwordInput);
            await user.type(passwordInput, 'test1234');

            expect(screen.getByText('이메일은 필수 입력 사항입니다.')).toBeInTheDocument();
            expect(submitButton).toBeDisabled();
        });
        it('SI-04: 비밀번호 미입력 상태에서 로그인 시도', async() => {
            const {user} = await render(<LoginForm />)

            const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
            const passwordInput = screen.getByPlaceholderText('비밀번호를 입력해주세요.');
            const submitButton = screen.getByRole('button', { name: '로그인' });

            
            await user.type(emailInput, 'test@test.com');
            await user.click(passwordInput);
            await user.click(document.body);

            expect(screen.getByText('비밀번호는 필수 입력 사항입니다.')).toBeInTheDocument();
            expect(submitButton).toBeDisabled();
        });
        it('SI-05: 이메일 형식이 잘못된 경우 로그인 시도', async() => {
            const {user} = await render(<LoginForm />)

            const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
            const passwordInput = screen.getByPlaceholderText('비밀번호를 입력해주세요.');
            const submitButton = screen.getByRole('button', { name: '로그인' });

            
            await user.type(emailInput, 'test');
            await user.type(passwordInput, 'test1234');

            expect(screen.getByText('이메일 형식이 올바르지 않습니다.')).toBeInTheDocument();
            expect(submitButton).toBeDisabled();
        });
        it('SI-06: 비밀번호가 8자 미만인 경우 로그인 시도', async() => {
            const {user} = await render(<LoginForm />)

            const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
            const passwordInput = screen.getByPlaceholderText('비밀번호를 입력해주세요.');
            const submitButton = screen.getByRole('button', { name: '로그인' });

            
            await user.type(emailInput, 'test@test.com');
            await user.type(passwordInput, 'test1');
            await user.click(document.body);

            expect(screen.getByText('비밀번호는 8자 이상이어야 합니다.')).toBeInTheDocument();
            expect(submitButton).toBeDisabled();
        });
    })
    describe('로그인 성공 테스트',()=>{
        beforeEach(()=>{
            navigateFn.mockClear();
        })
        it('SI-07: 올바른 이메일과 비밀번호로 로그인', async() => {
            testServer.use(
                http.post('*/api/member/login', () => {
                  return HttpResponse.json({
                    result: {
                      memberId: 1,
                      memberNickname: 'testuser',
                      accessToken: 'fake-token-1234',
                      refreshToken: 'fake-refresh-token-1234'
                    },
                    isSuccess: true,
                    code: 'SUCCESS',
                    message: '로그인 성공'
                  }, { status: 200 });
                })
              );
            const {user} = await render(<LoginForm />)

            const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
            const passwordInput = screen.getByPlaceholderText('비밀번호를 입력해주세요.');
            const submitButton = screen.getByRole('button', { name: '로그인' });

            
            await user.type(emailInput, 'test@test.com');
            await user.type(passwordInput, 'test1234');
    

            await user.click(submitButton);

            await waitFor(()=>{
                expect(navigateFn).toHaveBeenNthCalledWith(1,'/');
            });


        });
    })

});