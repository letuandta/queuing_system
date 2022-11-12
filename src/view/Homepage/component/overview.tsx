import Zstack from '@shared/components/ZstackComponent/Zstack'
import { Progress, Space, Badge } from 'antd'
import React from 'react'

interface OverviewProps {
    color: string | 'blue',
    progress: {
        percents: number[]
    },
    badges: {
        title: string
        quantity: number
    }[],
    icon: React.ReactNode,
    title: string,
    quantity: number
}

const Overview = (props: OverviewProps) => {

    const color = [props.color, 'gray', 'pink'];

    const widthsProgress = [80, 65, 50];

    return (
        <div className='overview-data'>
            <div className='overview-data-left'>
                <Zstack>
                    {
                        props.progress.percents.map((percent, index) => {
                            return <>
                                <Progress
                                    width={widthsProgress[index]}
                                    type="circle"
                                    percent={percent}
                                    showInfo={index === 0 ? true : false}
                                    strokeColor={color[index]}
                                />
                            </>
                        })
                    }
                </Zstack>
                <div className='zstack-description'>
                    <p className='data-quantity'>{props.quantity}</p>
                    <span style={{ color: `${props.color}`, stroke: `${props.color}` }}>
                        {props.icon}
                        <p>{props.title}</p>
                    </span>
                </div>
            </div>
            <div className='overview-data-right'>
                {props.badges.map((badge, index) => {
                    return <div key={index} className='badge-data' style={props.badges.length > 2 ? { padding: '0' } : { padding: "0.5rem 0" }}>
                        <Badge color={color[index]} text={badge.title} />
                        <p style={{ color: `${props.color}` }}>{badge.quantity}</p>
                    </div>
                })}
            </div>
        </div>
    )
}

export default React.memo(Overview)