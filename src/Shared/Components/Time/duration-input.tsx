interface Props {
    setTime: React.Dispatch<
        React.SetStateAction<{
            hour: string;
            min: string;
            sec: string;
        }>
    >;
    time: {
        hour: string;
        min: string;
        sec: string;
    };
}

const DurationInput = ({ setTime, time }: Props) => {
    const setMinOrSec = (ev: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const value = ev.target.value;
        const valueAsNum: number = Number(value);

        if (
            value === '' ||
            value === undefined ||
            isNaN(valueAsNum) ||
            valueAsNum > 59 ||
            valueAsNum < 0 ||
            value.length > 2
        ) {
            setTime({ ...time, [type]: '' });
            return;
        }

        setTime(Object.assign({ ...time, [type]: value }));
    };

    const validateDurationKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
        if (ev.key === 'e' || ev.key === '-') {
            ev.preventDefault();
        }
    };

    return (
        <div className="duration-container">
            <div>
                <input
                    className="duration"
                    type="number"
                    id="endHour"
                    value={time.hour}
                    onChange={(ev) => setTime(Object.assign({ ...time, hour: ev.target.value }))}
                    onKeyDown={(ev) => validateDurationKeyDown(ev)}
                ></input>
                <label htmlFor="time">Hour</label>
            </div>
            <div>
                <input
                    className="duration"
                    type="number"
                    id="endMin"
                    value={time.min}
                    onChange={(ev) => {
                        setMinOrSec(ev, 'min');
                    }}
                    onKeyDown={(ev) => validateDurationKeyDown(ev)}
                ></input>
                <label htmlFor="time">Min</label>
            </div>
            <div>
                <input
                    className="duration"
                    type="number"
                    id="endSec"
                    value={time.sec}
                    onChange={(ev) => {
                        setMinOrSec(ev, 'sec');
                    }}
                    onKeyDown={(ev) => validateDurationKeyDown(ev)}
                ></input>
                <label htmlFor="time">Sec</label>
            </div>
        </div>
    );
};
export default DurationInput;
