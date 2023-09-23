import { CalendarDate } from 'lib/calendar_date';

export const CalendarViewBuilder = (() => {
  return function (handleUpdateDay, year, month) {
    const headerWeeks = () => {
      return(
        ['日', '月', '火', '水', '木', '金', '土']
      )
    }

    const bodyWeeks = () => {
      const date = CalendarDate(year, month, 1);
      const firstDayOfMonth = date.firstWeekDayOfMonth(); // 当月の最初の曜日を取得
      const daysInMonth = date.lastDayOfMonth(); // 当月の最終日の日付を取得
      const calendarInfo = generateMonthDays(firstDayOfMonth, daysInMonth);
      return generateWeekRows(calendarInfo, handleUpdateDay, year, month);
    }

    const generateMonthDays = (firstDayOfMonth, daysInMonth): Array<{ dayNumber: number | null }> => {
      const totalDays = 6 * 7; // 最大6週間 x 7日
      let dayCount = 1;
      const calendarInfo = Array.from({ length: totalDays }, (_, index) => {
        if (index < firstDayOfMonth || dayCount > daysInMonth) {
          return { dayNumber: null };
        } else {
          return { dayNumber: dayCount++ };
        }
      });

      return calendarInfo as any;
    };
    const generateWeekRows = (calendarInfo, handleUpdateDay, year, month) => {
      const calendarRows = [];
      for (let i = 0; i < calendarInfo.length; i += 7) {
        const week = calendarInfo.slice(i, i + 7).map(({ dayNumber }, index) => {
          return { dayNumber, index };  // 必要な情報だけを返す
        });
        calendarRows.push(week);
      }
      return calendarRows;
    };

    return {
      headerWeeks,
      bodyWeeks,
    }
  }
})()