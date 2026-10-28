import fs from 'node:fs';
const path = 'src/data/bibleStudyWeeks.json';
if (!fs.existsSync(path)) throw new Error('Run from the ctgiphcsite repository root.');
const document = JSON.parse(fs.readFileSync(path, 'utf8'));
const lesson = {
  week: 4, title: 'Human Flourishing', resources: [{
    id: 'bible-study-lesson-4',
    title: 'Bible Study Lesson 4: Human Flourishing',
    category: 'Human Flourishing',
    description: 'Explore Genesis 2 and the foundations of human flourishing: God’s presence, purpose and productivity, abundance, rest and security, and community.',
    fileName: 'Bible_Study_Lesson_4.pdf', pageCount: 2, sizeBytes: 62570, available: true,
    video: { fileName: 'Bible_Study_Lesson_4.mp4', posterFileName: 'Bible_Study_Lesson_4.svg', duration: '57 min 27 sec', sizeBytes: 146271286 }
  }]
};
const existing = document.weeks.findIndex(x => x.week === 4);
if (existing >= 0) document.weeks[existing] = lesson;
else document.weeks.push(lesson);
document.weeks.sort((a,b)=>a.week-b.week);
document.currentWeek=4;
fs.writeFileSync(path, JSON.stringify(document,null,2)+'\n');
console.log('Week 4 set as current. Weeks 1–3 preserved.');
