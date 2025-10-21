export default function ThemeToggle(){
    const cycle = () => {
        const list = ["light","dark","cupcake"];
        const current = document.documentElement.getAttribute("data-theme") || "light";
        const next = list[(list.indexOf(current)+1)%list.length];
        document.documentElement.setAttribute("data-theme", next);
    };
    return <button className="btn btn-ghost" onClick={cycle}>Theme</button>;
}
