import { screen } from "@testing-library/react"
import React from "react"
import render from "@/lib/test/render"
import LoginPage from "@/pages/LoginPage"

const navigateFn = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...actual,
      Link: ({ to, children, ...props }: { to: string; children: React.ReactNode; [key: string]: unknown }) => {
        return (
          <a
            {...props}
            href={to}
            onClick={(e) => {
              e.preventDefault();
              navigateFn(to);
            }}
          >
            {children}
          </a>
        );
      },
      useNavigate: () => navigateFn,
    };
  });

it('SI-08: 로그인 페이지에서 회원가입 링크 클릭', async () => {
    const {user} = await render(<LoginPage />); 

    const signupLink = screen.getByText('회원가입')
    await user.click(signupLink)

    expect(navigateFn).toHaveBeenCalledWith('/signup');
})