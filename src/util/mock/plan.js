import moment from 'moment'

const planList = [
  '提高单词量，每天背5个单词，隔天复习一次',
  '背诵老师所规定的背诵篇目，通读一遍教材，每天早自习背诵一篇唐诗。',
  '看一遍教材，看完鲁迅的文学作品及其相关的美学思想。',
  '学习 TypeScript 的基础用法',
  '整理 Tarjan 算法和 Kosaraju 算法',
  '重新考英语六级等级证，分数520以上。每天早上多记英语单词，针对性做练习',
  '坚持去校图书馆借书阅书，坚持超额完成老师布置的读书任务，并且做好读书笔记。',
  '看一遍教材，整理好笔记，对相关的专题查找相关的资料',
  '奖励自己20分钟时间打篮球',
  '记好每一次的笔记，认真对待每一次的口头作业'
]

const titleList = ['学习提高', '温故知新', '取长补短', '放飞自我']

function randInt(a) {
  return Math.floor(Math.random() * a)
}
function createTimePlan() {
  let result = []
  for (let i = 0; i < 4; i++) {
    let temp = []
    for (let j = 0; j < 7; j++) {
      temp.push(randInt(24))
    }
    result.push(temp)
  }
  return result
}

function createTimeRange() {
  let beforeHour = Math.ceil(randInt(100))
  let afterMinutes = Math.ceil(randInt(600))
  let start = moment()
    .subtract(beforeHour, 'hours')
    .toDate()
  let end = moment(start)
    .add(afterMinutes, 'minutes')
    .toDate()
  return [start, end]
}

function createPlans(weekNum) {
  let result = []
  for (let i = 0; i < weekNum; i++) {
    let temp = {
      week: i,
      timePlan: createTimePlan(),
      items: []
    }
    for (let j = 0; j < randInt(5) + 2; j++) {
      let content = planList[randInt(planList.length)],
        timeRange = createTimeRange(),
        title = titleList[randInt(titleList.length)]
      temp.items.push({ content, timeRange, title })
    }

    result.push(temp)
  }
  return result
}

export function mockPlanTitle() {
  return titleList[randInt(titleList.length)]
}
export function mockPlanContent() {
  return planList[randInt(planList.length)]
}

export { createPlans }
