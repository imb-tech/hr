import { SwitchProps, useSwitch } from "@heroui/switch";
import { useTheme } from "@heroui/use-theme";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import clsx from "clsx";
import { FC } from "react";

import { MoonFilledIcon, SunFilledIcon } from "@/components/icons";

export interface ThemeSwitchProps {
  className?: string;
  classNames?: SwitchProps["classNames"];
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const { theme, setTheme } = useTheme();

  const { Component, isSelected, getBaseProps, getInputProps } = useSwitch({
    isSelected: theme === "light",
    onChange: () => {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
    },
  });

  return (
    <Component
      aria-label={isSelected ? "Switch to dark mode" : "Switch to light mode"}
      {...getBaseProps({
        className: clsx(
          "transition-opacity hover:opacity-80 cursor-pointer",
          className,
          classNames?.base,
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div>
        {isSelected ? (
          <div className="flex items-center gap-2 !w-full ">
            <MoonFilledIcon size={18} />
            <span>Tun</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 !w-full ">
            <SunFilledIcon size={18} />
            <span>Kun</span>
          </div>
        )}
      </div>
    </Component>
  );
};
