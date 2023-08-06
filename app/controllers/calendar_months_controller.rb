# frozen_string_literal: true

class CalendarMonthsController < ApplicationController
  def create
    @calendar = Calendar.find(params[:calendar_id])
    now = Time.zone.now
    calendar_month = @calendar.calendar_months.find_or_create_by!(year: now.year, month: now.month)
    calendar_month.create_days!
    redirect_to calendar_calendar_month_path(@calendar, calendar_month)
  end

  def show
    @calendar_month = Calendar.find(params[:calendar_id]).calendar_months.find(params[:id])
  end

  def recalculate
    @calendar_month = Calendar.find(params[:calendar_id]).calendar_months.find(params[:id])
    @calendar_month.recalculate_in_future
    redirect_to calendar_calendar_month_path(@calendar_month.calendar, @calendar_month), notice: '再計算しました'
  end
end
