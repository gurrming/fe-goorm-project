import Chat from '../chart/chatting/Chat';


export default {
    title: 'Chat',
    component: Chat,
    parameters: {
        backgrounds: {
            default: 'white',
        },
    },
    argTypes:{
        nickname: { control: 'text' },
        message: { control: 'text' },
        time: { control: 'text' },
        hideDay: { control: 'boolean' },
        userId: { control: 'number' },
    },
}

export const Default = {
    name: '기본',
    args: {
        nickname: 'test',
        message: 'Hello, world!',
        time: '2024-01-01T12:00:00',
        hideDay: false,
        userId: 1,
    },
}

export const Other = {
    name: '다른 사람의 메시지',
    args: {
        nickname: 'other',
        message: 'Hello, world!',
        time: '2024-01-01T12:00:00',
        hideDay: false,
        userId: 2,
    },
}

export const HideDay = {
    name: '날짜 숨김',
    args: {
        nickname: 'test',
        message: 'Hello, world!',
        time: '2024-01-01T12:00:00',
        hideDay: true,
        userId: 1,
    },
}

export const LongMessage = {
    name: '긴 메시지',
    args: {
        nickname: 'test',
        message: 'Hello, world!'.repeat(100),
        time: '2024-01-01T12:00:00',
        hideDay: false,
        userId: 1,
    },
}