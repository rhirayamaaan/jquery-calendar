import $ from "jquery";
import { Calendar } from "calendar";
import moment from "moment-timezone";

class JqueryCalendar {
  static get ROOT_HTML() {
    return "<table />";
  }

  static get HEADER_HTML() {
    return `
      <thead>
        <tr>
          <th>日</th>
          <th>月</th>
          <th>火</th>
          <th>水</th>
          <th>木</th>
          <th>金</th>
          <th>土</th>
        </tr>
      </thead>
    `;
  }

  static get BODY_HTML() {
    return "<tbody />";
  }

  static get BODY_ROW_HTML() {
    return "<tr />";
  }

  static get BODY_CELL_HTML() {
    return "<td />";
  }

  static get CAPTION_HTML() {
    return "<caption />";
  }

  static get TITLE_HTML() {
    return "<span />";
  }

  static get PREV_BUTTON_HTML() {
    return "<span>＜</span>";
  }

  static get NEXT_BUTTON_HTML() {
    return "<span>＞</span>";
  }

  // clickイベント名
  static get CLICK_EVENT_NAME() {
    return "click.JqueryCalendar";
  }

  constructor($target = $("body")) {
    this.nowDate = moment().tz("Asia/Tokyo");
    this.$target = $target;

    this.setCalendarData();

    this.render();

    return this;
  }

  setCalendarData() {
    this.calendarData = new Calendar().monthDays(
      this.nowDate.year(),
      this.nowDate.month()
    );
    this.render();
  }

  goToPrevMonth() {
    this.nowDate = this.nowDate.add(-1, "month");
    this.setCalendarData();
  }

  goToNextMonth() {
    this.nowDate = this.nowDate.add(1, "month");
    this.setCalendarData();
  }

  createCaptionDOM() {
    const $caption = $(JqueryCalendar.CAPTION_HTML);
    const $prev = $(JqueryCalendar.PREV_BUTTON_HTML);
    const $next = $(JqueryCalendar.NEXT_BUTTON_HTML);

    $prev.on(JqueryCalendar.CLICK_EVENT_NAME, () => this.goToPrevMonth());
    $next.on(JqueryCalendar.CLICK_EVENT_NAME, () => this.goToNextMonth());

    $caption
      .append($prev)
      .append(
        $(JqueryCalendar.TITLE_HTML).text(
          `${this.nowDate.year()}年${this.nowDate.month() + 1}月`
        )
      )
      .append($next);

    return $caption;
  }

  createHeadDOM() {
    return $(JqueryCalendar.HEADER_HTML);
  }

  createBodyDOM() {
    const $body = $(JqueryCalendar.BODY_HTML);

    this.calendarData.forEach((week) => {
      const $row = $(JqueryCalendar.BODY_ROW_HTML);

      $body.append($row);

      week.forEach((day) => {
        const $cell = $(JqueryCalendar.BODY_CELL_HTML);
        if (day !== 0) $cell.text(day);
        $row.append($cell);
      });
    });

    return $body;
  }

  render() {
    this.$target.empty();

    const $calendar = $(JqueryCalendar.ROOT_HTML);

    $calendar
      .append(this.createCaptionDOM())
      .append(this.createHeadDOM())
      .append(this.createBodyDOM());

    $calendar.appendTo(this.$target);
  }
}

new JqueryCalendar($("#wrapper"));
