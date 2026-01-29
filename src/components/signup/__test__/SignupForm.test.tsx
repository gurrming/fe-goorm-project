import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import render from '../../../lib/test/render';
import SignupForm from '../SignupForm';
import { testServer } from '@/mocks/testServer';

const navigateFn = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateFn,
  };
});

describe('SignupForm', () => {
  describe('회원가입 유효성 검사 테스트', () => {
    it('SU-01: 이메일 형식이 잘못된 경우 회원가입 시도', async () => {
      const { user } = await render(<SignupForm />);

      const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
      const passwordInput = screen.getByPlaceholderText('비밀번호를 입력해주세요.');
      const passwordConfirmInput = screen.getByPlaceholderText('비밀번호를 다시 입력해주세요.');
      const submitButton = screen.getByRole('button', { name: '회원가입' });

      await user.type(emailInput, 'test');
      await user.type(passwordInput, 'test1234');
      await user.type(passwordConfirmInput, 'test1234');
      expect(screen.getByText('이메일 형식이 올바르지 않습니다.')).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });
    it('SU-02: 이메일 미입력 상태에서 회원가입 시도', async () => {
      const { user } = await render(<SignupForm />);

      const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
      const passwordInput = screen.getByPlaceholderText('비밀번호를 입력해주세요.');
      const passwordConfirmInput = screen.getByPlaceholderText('비밀번호를 다시 입력해주세요.');
      const submitButton = screen.getByRole('button', { name: '회원가입' });

      await user.click(emailInput);
      await user.type(passwordInput, 'test1234');
      await user.type(passwordConfirmInput, 'test1234');

      await user.click(submitButton);

      expect(screen.getByText('이메일은 필수 입력 사항입니다.')).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });
    it('SU-03: 비밀번호가 8자 미만인 경우 회원가입 시도', async () => {
      const { user } = await render(<SignupForm />);

      const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
      const passwordInput = screen.getByPlaceholderText('비밀번호를 입력해주세요.');
      const passwordConfirmInput = screen.getByPlaceholderText('비밀번호를 다시 입력해주세요.');
      const submitButton = screen.getByRole('button', { name: '회원가입' });

      await user.click(emailInput);
      await user.click(passwordInput);
      await user.type(passwordInput, 'test1');
      await user.type(passwordConfirmInput, 'test1');

      expect(screen.getByText('비밀번호는 8자 이상이어야 합니다.')).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });
    it('SU-04: 비밀번호 미입력 상태에서 회원가입 시도', async () => {
      const { user } = await render(<SignupForm />);

      const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
      const passwordInput = screen.getByPlaceholderText('비밀번호를 입력해주세요.');
      const submitButton = screen.getByRole('button', { name: '회원가입' });

      await user.type(emailInput, 'test@test.com');
      await user.click(passwordInput);
      await user.click(document.body);

      expect(screen.getByText('비밀번호는 필수 입력 사항입니다.')).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });
    it('SU-05: 비밀번호와 비밀번호 확인 불일치', async () => {
      const { user } = await render(<SignupForm />);

      const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
      const passwordInput = screen.getByPlaceholderText('비밀번호를 입력해주세요.');
      const passwordConfirmInput = screen.getByPlaceholderText('비밀번호를 다시 입력해주세요.');
      const submitButton = screen.getByRole('button', { name: '회원가입' });

      await user.type(emailInput, 'test@test.com');
      await user.type(passwordInput, 'test1234');
      await user.type(passwordConfirmInput, 'test12345');
      await user.click(document.body);

      expect(screen.getByText('비밀번호가 일치하지 않습니다.')).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });
    it('SU-06: 비밀번호 확인 미입력 상태에서 회원가입 시도', async () => {
      const { user } = await render(<SignupForm />);

      const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
      const passwordInput = screen.getByPlaceholderText('비밀번호를 입력해주세요.');
      const passwordConfirmInput = screen.getByPlaceholderText('비밀번호를 다시 입력해주세요.');
      const submitButton = screen.getByRole('button', { name: '회원가입' });

      await user.type(emailInput, 'test@test.com');
      await user.type(passwordInput, 'test1234');
      await user.click(passwordConfirmInput);
      await user.click(document.body);

      await waitFor(() => {
        expect(screen.getByText('비밀번호 확인은 필수 입력 사항입니다.')).toBeInTheDocument();
      });
      expect(submitButton).toBeDisabled();
    });
    it('SU-07: 닉네임 미입력 상태에서 회원가입 시도', async () => {
      const { user } = await render(<SignupForm />);

      const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
      const passwordInput = screen.getByPlaceholderText('비밀번호를 입력해주세요.');
      const passwordConfirmInput = screen.getByPlaceholderText('비밀번호를 다시 입력해주세요.');
      const nicknameInput = screen.getByPlaceholderText('닉네임을 입력해주세요.');
      const submitButton = screen.getByRole('button', { name: '회원가입' });

      await user.type(emailInput, 'test@test.com');
      await user.type(passwordInput, 'test1234');
      await user.type(passwordConfirmInput, 'test1234');
      await user.click(nicknameInput);
      await user.click(document.body);

      expect(screen.getByText('닉네임은 필수 입력 사항입니다.')).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });
  });

  describe('이메일 중복 확인 테스트', () => {
    beforeEach(() => {
      vi.spyOn(window, 'alert').mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });
    it('SU-08: 이미 존재하는 이메일로 회원가입 시도', async () => {
      testServer.use(
        http.post('*/api/member/exists', () => {
          return HttpResponse.json(
            {
              isExists: true,
            },
            { status: 200 },
          );
        }),
      );
      const { user } = await render(<SignupForm />);

      const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
      const emailExistButton = screen.getByRole('button', { name: '중복 확인' });

      await user.type(emailInput, 'test@test.com');
      await user.click(emailExistButton);

      expect(screen.getByText('이미 사용 중인 이메일 입니다.')).toBeInTheDocument();
    });
    it('SU-09: 중복 확인 없이 나머지 필드 입력 후 회원가입 시도', async () => {
      const { user } = await render(<SignupForm />);

      const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
      const passwordInput = screen.getByPlaceholderText('비밀번호를 입력해주세요.');
      const passwordConfirmInput = screen.getByPlaceholderText('비밀번호를 다시 입력해주세요.');
      const nicknameInput = screen.getByPlaceholderText('닉네임을 입력해주세요.');
      const submitButton = screen.getByRole('button', { name: '회원가입' });

      await user.type(emailInput, 'test@test.com');
      await user.type(passwordInput, 'test1234');
      await user.type(passwordConfirmInput, 'test1234');
      await user.type(nicknameInput, 'test');

      expect(screen.getByText('이메일 중복 확인을 해주세요.')).toBeInTheDocument();
      expect(submitButton).toBeDisabled();
    });
  });
  describe('회원가입 성공 테스트', () => {
    beforeEach(() => {
      navigateFn.mockClear();
    });
    it('SU-10: 올바른 회원가입 시도', async () => {
      testServer.use(
        http.post('*/api/member/exists', () => {
          return HttpResponse.json(
            {
              isExists: false,
            },
            { status: 200 },
          );
        }),
      );
      testServer.use(
        http.post('*/api/member/signup', () => {
          return HttpResponse.json(
            {
              isSuccess: true,
              code: 'SUCCESS',
              message: '회원가입 성공',
            },
            { status: 200 },
          );
        }),
      );
      const { user } = await render(<SignupForm />);

      const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
      const emailExistButton = screen.getByRole('button', { name: '중복 확인' });
      const passwordInput = screen.getByPlaceholderText('비밀번호를 입력해주세요.');
      const passwordConfirmInput = screen.getByPlaceholderText('비밀번호를 다시 입력해주세요.');
      const nicknameInput = screen.getByPlaceholderText('닉네임을 입력해주세요.');
      const submitButton = screen.getByRole('button', { name: '회원가입' });

      await user.type(emailInput, 'test@test.com');
      await user.click(emailExistButton);
      await user.type(passwordInput, 'test1234');
      await user.type(passwordConfirmInput, 'test1234');
      await user.type(nicknameInput, 'test');

      await user.click(submitButton);

      expect(screen.getByText('사용 가능한 이메일입니다.')).toBeInTheDocument();
      await waitFor(() => {
        expect(navigateFn).toHaveBeenNthCalledWith(1, '/login');
      });
    });
  });
});
