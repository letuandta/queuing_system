import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import ISelect from '@core/select';
import { ReactSVG } from 'react-svg';
import { downDropdown, upDropdown } from '@assets/svg';

const { Option } = Select;

export interface ISelectAndLabel {
  disabled?: boolean;
  textLabel?: any;
  defaultValue?: any;
  dataString?: Array<ISelect>;
  onChange?: any;
  placeholder?: string;
  value?: any;
  className?: string;
  classNameSelect?: string;
  dropdownClassName?: string;
  name?: string;
  keyLabel?: string;
  translate?: boolean;
  require?: boolean;
}

const SelectAndLabelComponent: React.FC<ISelectAndLabel> = (props: ISelectAndLabel) => {
  const { keyLabel, dataString, translate } = props;
  const intl = useIntl();
  const [value, setValue] = useState(props.value);
  const [dropdownStatus, setDropdownStatus] = useState(false);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const onChange = (paramValue: any) => {
    setValue(paramValue);
    if (props.onChange) {
      props.onChange(paramValue);
    }
  };
  const className = props.className ? props.className : '';
  // const all = intl.formatMessage({ id: 'common.all' });

  const renderUIOption = React.useMemo(() => {
    if (dataString == null) {
      return undefined;
    }
    return dataString.map((item: ISelect, index: number) => {
      if (translate === false) {
        return (
          <Option value={item.value} key={index}>
            {item?.label}
          </Option>
        );
      }
      return (
        <Option value={item.value} key={index}>
          {keyLabel != null && item.value != null ? (
            <FormattedMessage id={item?.label} values={{ [keyLabel]: item.value }} />
          ) : (
            <FormattedMessage id={item?.label} />
          )}
        </Option>
      );
    });
  }, [dataString, keyLabel, translate]);

  const renderUILabel = React.useMemo(() => {
    if (props?.textLabel == null) {
      return undefined;
    }
    return (
      <div>
        <FormattedMessage id={props.textLabel} defaultMessage={props.textLabel} />
        {props?.require ? <span style={{ color: 'red' }}>*</span> : ''}
      </div>
    );
  }, [props.textLabel]);

  return (
    <div className={`select-label-component ${className}`} onClick={() => setDropdownStatus(prev => !prev)
    }>
      <div className="label-select">
        {renderUILabel}
        <Select
          className={'select-custom ' + (props.classNameSelect || '')}
          value={value == null ? null : value}
          defaultValue={props?.defaultValue ? props?.defaultValue : null}
          onChange={onChange}
          disabled={props.disabled}
          suffixIcon={dropdownStatus === false ? <ReactSVG src={downDropdown} /> : <ReactSVG src={upDropdown} />}
          placeholder={props?.placeholder}
          dropdownClassName={props?.dropdownClassName}
          dropdownRender={menu => {
            return (
              <React.Fragment>
                {menu}
              </React.Fragment>
            )
          }
          }
        >
          {renderUIOption}
        </Select>
      </div>
    </div>
  );
};

export default React.memo(SelectAndLabelComponent);
