import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { numberOrder } from '@assets/svg';
import React from 'react';
import { ReactSVG } from 'react-svg';

interface StatsOrderProps {
    icon?: any,
    description?: string,
    quantity?: number,
    percent?: number,
    status?: 'increase' | 'decrease'
}




const StatsOrder = (props: StatsOrderProps) => {

    const statusPercent = props?.status === "increase" ? 'increase-percent' : 'decrease-percent';
    const quantityFormat = props?.quantity?.toLocaleString(undefined, { maximumFractionDigits: 0 })
    const percentFormat = props?.percent?.toLocaleString(undefined, { maximumFractionDigits: 2 })

    return (
        <>
            <div className="stats-order-top">
                <ReactSVG src={props?.icon} />
                <p>{props?.description}</p>
            </div>
            <div className="stats-order-bottom">
                <p>{quantityFormat}</p>
                <span className={statusPercent}>

                    {props?.status === "increase" ?
                        <ArrowUpOutlined />
                        :
                        <ArrowDownOutlined />
                    }
                    <p>{percentFormat}%</p>
                </span>
            </div>
        </>
    )
}

export default StatsOrder