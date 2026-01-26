import { render, screen } from '@testing-library/react';
import Text from '../Text';

describe('Text 컴포넌트', () => {   
    it('label(text), price, type이 올바르게 렌더링된다.', () => {
        render(
          <Text
            text="보유잔액"
            price="1,000,000"
            type="KRW"
            size="sm"
            priceColor="black"
          />
        );
    
        expect(screen.getByText('보유잔액')).toBeInTheDocument();
        expect(screen.getByText('1,000,000')).toBeInTheDocument();
        expect(screen.getByText('KRW')).toBeInTheDocument();
      });

    describe('Price Color Style', ()=>{
        it('priceColor가 blue인 경우, price가 파란색으로 렌더링된다.', () => {
            render(
                <Text
                    text="보유잔액"
                    price="1,000,000"
                    type="KRW"
                    size="sm"
                    priceColor="blue"
                />
            );
            expect(screen.getByText('1,000,000')).toHaveClass('text-sm text-[#0062DF]');
        });

        it('priceColor가 red인 경우, price가 빨간색으로 렌더링된다.', () => {
            render(
                <Text
                    text="보유잔액"
                    price="1,000,000"
                    type="KRW"
                    size="sm"
                    priceColor="red"
                />
            );
            expect(screen.getByText('1,000,000')).toHaveClass('text-sm text-[#DD3C44]');
        });

        it('priceColor가 black인 경우, price가 검정색으로 렌더링된다.', () => {
            render(
                <Text
                    text="보유잔액"
                    price="1,000,000"
                    type="KRW"
                    size="sm"
                    priceColor="black"
                />
            );
            expect(screen.getByText('1,000,000')).toHaveClass('text-sm text-[#333333]');
        });
    });
    describe('Size Style', ()=>{
        it('size가 xs인 경우, price가 13px로 렌더링된다.', () => {
            render(
                <Text
                    text="보유잔액"
                    price="1,000,000"
                    type="KRW"
                    size="xs"
                    priceColor="black"
                />
            );
            expect(screen.getByText('1,000,000')).toHaveClass('text-xs');
        });
        it('size가 sm인 경우, price가 13px로 렌더링된다.', () => {
            render(
                <Text
                    text="보유잔액"
                    price="1,000,000"
                    type="KRW"
                    size="sm"
                    priceColor="black"
                />
            );
            expect(screen.getByText('1,000,000')).toHaveClass('text-sm');
        });
    });
    describe('price 형식 테스트', ()=>{
        it('price가 숫자인 경우, price가 올바르게 렌더링된다.', () => {
            render(
                <Text
                    text="보유잔액"
                    price={1000000}
                    type="KRW"
                    size="sm"
                    priceColor="black"
                />
            );
            expect(screen.getByText('1000000')).toHaveClass('text-sm');
        });
        it('price가 문자열인 경우, price가 올바르게 렌더링된다.', () => {
            render(
                <Text
                    text="보유잔액"
                    price="1,000,000"
                    type="KRW"
                    size="sm"
                    priceColor="black"
                />
            );
            expect(screen.getByText('1,000,000')).toHaveClass('text-sm');
        });
    });
});