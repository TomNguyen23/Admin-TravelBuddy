const SpanedLabel = ({ value, bgColor, textColor }) => {
    return (
        <span className={`px-2 py-1 rounded-md ${bgColor} ${textColor}`}>{value}</span>
    );
};

export default SpanedLabel;