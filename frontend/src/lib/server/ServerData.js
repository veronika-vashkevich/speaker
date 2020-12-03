import { filter } from 'underscore'

const USER = 'Иванов Иван Иванович'

export const lessons = [
    {
        date: 1560422694514,
        pupilName: 'Veronica',
        teacherName: 'Maria',
        lessonNumber: '1',
        lessonsLeft: '9',
        lessonMark: '7',
        notes:'-',
        paid:'yes'
    },
    {
        date: 1560422694514,
        pupilName: 'Deni',
        teacherName: 'Mariya',
        lessonNumber: '3',
        lessonsLeft: '6',
        lessonMark: '9',
        notes:'Was very good',
        paid:'yes'
    },
    {
        date: 1560422694514,
        pupilName: 'Deni',
        teacherName: 'Mariya',
        lessonNumber: '4',
        lessonsLeft: '5',
        lessonMark: '9',
        notes:'Was very good',
        paid:'yes'
    },
    {
        date: 1560422694514,
        pupilName: 'Deni',
        teacherName: 'Mariya',
        lessonNumber: '5',
        lessonsLeft: '4',
        lessonMark: '9',
        notes:'Was very good',
        paid:'yes'
    },
    {
        date: 1560422694514,
        pupilName: 'Veronica',
        teacherName: 'Maria',
        lessonNumber: '1',
        lessonsLeft: '9',
        lessonMark: '7',
        notes:'-',
        paid:'yes'
    },
    {
        date: 1560422694514,
        pupilName: 'Deni',
        teacherName: 'Mariya',
        lessonNumber: '3',
        lessonsLeft: '6',
        lessonMark: '9',
        notes:'Was very good',
        paid:'yes'
    },
    {
        date: 1560422694514,
        pupilName: 'Deni',
        teacherName: 'Mariya',
        lessonNumber: '4',
        lessonsLeft: '5',
        lessonMark: '9',
        notes:'Was very good',
        paid:'yes'
    },
    {
        date: 1560422694514,
        pupilName: 'Deni',
        teacherName: 'Mariya',
        lessonNumber: '5',
        lessonsLeft: '4',
        lessonMark: '9',
        notes:'Was very good',
        paid:'yes'
    },
    {
        date: 1560422694514,
        pupilName: 'Veronica',
        teacherName: 'Maria',
        lessonNumber: '1',
        lessonsLeft: '9',
        lessonMark: '7',
        notes:'-',
        paid:'yes'
    },
    {
        date: 1560422694514,
        pupilName: 'Deni',
        teacherName: 'Mariya',
        lessonNumber: '3',
        lessonsLeft: '6',
        lessonMark: '9',
        notes:'Was very good',
        paid:'yes'
    },
    {
        date: 1560422694514,
        pupilName: 'Deni',
        teacherName: 'Mariya',
        lessonNumber: '4',
        lessonsLeft: '5',
        lessonMark: '9',
        notes:'Was very good',
        paid:'yes'
    },
    {
        date: 1560422694514,
        pupilName: 'Deni',
        teacherName: 'Mariya',
        lessonNumber: '5',
        lessonsLeft: '4',
        lessonMark: '9',
        notes:'Was very good',
        paid:'yes'
    }
]


export function getLessons (params) {
    const {
        startDate,
        endDate,
        clientName,
        onlyMe,
    } = params

    return filter(lessons, o => {
        return (startDate ? o.date >= startDate : true) &&
            (endDate ? o.date <= endDate : true) &&
            (clientName ? (clientName.length > 2 ? o.clientName.includes(clientName) : true) : true) &&
            (onlyMe ? o.holderName === USER : true)
    })
}