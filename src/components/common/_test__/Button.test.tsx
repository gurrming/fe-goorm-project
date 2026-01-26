import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

describe('Button 컴포넌트', () => {
    it('children 렌더링 테스트', () => {
        render(<Button colorType="blue">테스트</Button>);
        const button = screen.getByRole('button', { name: '테스트' });
        expect(button).toBeInTheDocument();
    });
    
    it('colorType 렌더링 테스트', () => {
        render(<Button colorType="white">테스트</Button>);
        const button = screen.getByRole('button', { name: '테스트' });
        expect(button).toHaveClass('bg-[#EDEEF1] text-primary-100');
    });
    
    it('disabled 렌더링 테스트', () => {
        render(<Button colorType="blue" disabled={true}>테스트</Button>);
        const button = screen.getByRole('button', { name: '테스트' });
        expect(button).toBeDisabled();
    });
    
    it('onClick 핸들러 호출 테스트', async () => {
        const onClick = vi.fn();
        render(<Button colorType="blue" onClick={onClick}>테스트</Button>);
        const button = screen.getByRole('button', { name: '테스트' });
        await userEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
    });
    
    it('커스텀 className 병합 테스트', () => {
        render(<Button colorType="blue" className="text-[50px]">테스트</Button>);
        const button = screen.getByRole('button', { name: '테스트' });
        expect(button).toHaveClass('text-[50px]');
    });
});