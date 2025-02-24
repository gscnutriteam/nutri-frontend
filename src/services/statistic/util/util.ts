export const parseDateToString = (date: Date) => {
    return date.toLocaleDateString("id-ID", {year: "numeric", month: "long", day: "numeric"});
}