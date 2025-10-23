// SelectType.jsx
import { Listbox } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";

const TYPES = ["movie", "book", "game", "manga", "anime", "music"];

export default function SelectType({ value, onChange }) {
    return (
        <div className="relative">
            <Listbox
                value={value}
                onChange={(val) => {
                    onChange(val);
                }}
            >
                <Listbox.Button className="w-full select select-bordered flex items-center justify-between">
                    <span>{value || "— choisir —"}</span>
                    <ChevronDown size={16} className="opacity-70" />
                </Listbox.Button>

                <Listbox.Options className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-box border bg-base-100 shadow">
                    {TYPES.map((t) => (
                        <Listbox.Option
                            key={t}
                            value={t}
                            className={({ active, selected }) =>
                                `cursor-pointer px-3 py-2 text-sm ${
                                    active ? "bg-neutral text-neutral-content" : ""
                                } ${selected ? "font-semibold" : ""}`
                            }
                        >
                            {({ selected }) => (
                                <div className="flex items-center gap-2">
                                    {selected && <Check size={16} />}
                                    <span className="capitalize">{t}</span>
                                </div>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    );
}
