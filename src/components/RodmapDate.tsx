import { YugaItem } from "../database/database";
import { to_string_date } from "../utils/utils";

export default function RoadmapDate({ item }: { item: YugaItem }) {

    var string_date: string = "";
    var color: string = "";
    var tip: string = "";

    if (item.date_delivered) {
        string_date = to_string_date(item.date_delivered);
        if (item.date_delivered_end) {
            string_date += " - " + to_string_date(item.date_delivered_end);
        }
        tip = "Date this happened";
    } else if (item.date_promised_as_string) {
        string_date = item.date_promised_as_string;
        color = "yellow";
        tip = "Official timeframe from Yuga";
    } else if (item.date_promised_latest) {
        string_date = to_string_date(item.date_promised_latest);
        color = "darkyellow";
        let orig_date = to_string_date(item.date_promised_original);
        tip =`"Latest promised date. Original was: ${orig_date}"`;
    } else if (item.date_promised_original) {
        string_date = to_string_date(item.date_promised_original);
        color = "yellow";
        tip = "Original (and only) promised date";
    } 
    
    color = color.length ? "color:" + color : ""; // we end up with color:orange or ""
    
    return (
        <span class="searchable" style={color}>{string_date}</span>
    );
}