import { useState, useEffect } from 'react';
import './autocomplete.css';
import HighlightsText from '@/components/highlights-text/HighlightsText';

type props = {
  placeholder: string;
  data?: any[];
  getAsyncData?: (filter: string) => Promise<any>;
  renderItem?: (item: any) => string;
  onSelect?: (value: any) => void;
  onChange?: (value: any) => void;
};
export default function Autocomplete({
  placeholder,
  data,
  getAsyncData,
  renderItem = (item) => item,
  onSelect = () => {},
  onChange = () => {},
}: props) {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(data || []);

  const onChangeHandler = (e: any) => {
    const input = e.target.value;
    setValue(input);
  };

  const onClickHandler = () => {
    setOpen(true);
  };

  const onClickItemHandler = (item: any) => {
    setOpen(false);
    setValue(renderItem(item));
    onChange(renderItem(item));
    onSelect(item);
  };

  useEffect(() => {
    if (value) {
      if (getAsyncData) {
        getAsyncData(value).then((resp) => {
          setFilteredData(resp);
        });
      } else {
        if (data) {
          setFilteredData(
            data.filter((item) => {
              if (value) {
                return item.includes(value);
              }
              return true;
            }),
          );
        }
      }
    } else {
      onChange('');
    }
  }, [value, setFilteredData]);

  return (
    <div className="autocomplete">
      <div className="autocomplete-container">
        <div className="input">
          <input
            placeholder={placeholder}
            type="text"
            value={value}
            onChange={onChangeHandler}
            onClick={onClickHandler}
          />
          {open && (
            <div className="close" onClick={() => setOpen(false)}>
              X
            </div>
          )}
        </div>
      </div>
      {open && (
        <div className="autocomplete-data">
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="item"
              onClick={() => onClickItemHandler(item)}
            >
              <HighlightsText text={renderItem(item)} highlight={value} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
