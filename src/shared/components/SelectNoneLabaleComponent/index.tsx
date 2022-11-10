import { CaretDownOutlined } from '@ant-design/icons'
import React from 'react'
import './style.scss'
import { Select } from 'antd';

interface SelectNoneLableProps {
    defaultvalue?: any,
    option?: {
        value: string,
        label: string
    }[]
}


const SelectNoneLable = (props: SelectNoneLableProps) => {
    return (
        <div className='select-none-lable'>
            <Select
                defaultValue={props?.defaultvalue}
                style={{ width: 120 }}
                allowClear
                suffixIcon={<CaretDownOutlined />}
                options={props?.option}
            />
        </div>
    )
}

export default SelectNoneLable