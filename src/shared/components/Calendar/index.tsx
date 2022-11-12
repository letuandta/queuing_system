import React, { useState } from "react";
import "./style.scss";
import { Button, Calendar, Col, Divider, Row } from "antd";
import type { CalendarMode } from "antd/es/calendar/generateCalendar";
import type { Moment } from "moment";
import moment from "moment";

const Calender = () => {
    const onPanelChange = (value: Moment, mode: CalendarMode) => {
        console.log(value.format("YYYY-MM-DD"), mode);
    };

    const [currentDate, setCurrentDate] = useState(moment(new Date()));

    return (
        <>
            <div className="site-calendar-customize-header-wrapper">
                <Calendar
                    fullscreen={false}
                    value={currentDate}
                    headerRender={({ value, onChange }) => {
                        return (
                            <>
                                <div style={{ padding: 8 }} className='header-calendar'>

                                    <Row gutter={80} justify="space-around" align="middle">
                                        <Col>
                                            <Button
                                                className='next-month-button'
                                                onClick={() => {
                                                    const nextMonth = value.clone().add(-1, "months");
                                                    onChange(nextMonth);
                                                }}
                                            >
                                                {"<"}
                                            </Button>
                                        </Col>
                                        <Col>{value.clone().format("DD MMM YYYY")}</Col>
                                        <Col>
                                            <Button
                                                className='next-month-button'
                                                onClick={() => {
                                                    const nextMonth = value.clone().add(1, "months");
                                                    onChange(nextMonth);
                                                }}
                                            >
                                                {">"}
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                                <hr />
                            </>
                        );
                    }}
                    onPanelChange={onPanelChange}
                    onSelect={(date) => setCurrentDate(date)}
                />
            </div>
        </>
    );
}

export default React.memo(Calender)