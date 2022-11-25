import { CaretRightOutlined } from '@ant-design/icons';
import { calendar } from '@assets/svg';
import { DatePicker } from 'antd';
import React, { useEffect, useState } from 'react'
import { ReactSVG } from 'react-svg';
import './style.scss'
export interface IDatePicker {
    label?: string
    pickerOne?: {
        value?: any;
        onChange?: (value) => void;
        defaultValue?: any;
        className?: string;
    }
    pickerTwo?: {
        value?: any;
        onChange?: (value) => void;
        defaultValue?: any;
        className?: string;
    }
}

const DataPickerComponent = (props: IDatePicker) => {
    const [valueOne, setValueOne] = useState();
    const [valueTwo, setValueTwo] = useState();

    useEffect(() => {
        setValueOne(props?.pickerOne?.value);
        setValueTwo(props?.pickerTwo?.value)
    }, [props?.pickerOne?.value, props?.pickerTwo?.value]);


    const onChangePickerOne = pValue => {
        setValueOne(pValue);
        if (props?.pickerOne?.onChange) {
            props?.pickerOne?.onChange(pValue);
        }
    };

    const onChangePickerTwo = pValue => {
        setValueTwo(pValue);
        if (props?.pickerTwo?.onChange) {
            props?.pickerTwo?.onChange(pValue);
        }
    };



    return (
        <>
            <div className='datepicker-custom'>
                <div className='datepicker-custom-label'>
                    <span>{props?.label}</span>
                </div>
                <div className='datepicker-custom-content'>
                    <DatePicker
                        suffixIcon={<ReactSVG src={calendar} />}
                        placeholder={'10/10/2012'}
                        format={'DD/ MM /YYYY'}
                        onChange={onChangePickerOne}
                        value={valueOne}
                        defaultValue={props?.pickerOne?.defaultValue}
                        className={props?.pickerOne?.className}
                    />
                    <p><CaretRightOutlined /></p>
                    <DatePicker
                        suffixIcon={<ReactSVG src={calendar} />}
                        placeholder={'10/10/2012'}
                        format={'DD/ MM /YYYY'}
                        onChange={onChangePickerTwo}
                        value={valueTwo}
                        defaultValue={props?.pickerTwo?.defaultValue}
                        className={props?.pickerTwo?.className}
                    />
                </div>

            </div>

        </>
    )
}

export default DataPickerComponent