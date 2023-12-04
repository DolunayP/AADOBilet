import className from "classnames";

import { twMerge } from "tailwind-merge";

function AadoButton({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  ...rest
}) {
  const classes = twMerge(
    className(rest.className, "flex items-center px-3 py-1.5 border", {
      "bg-[#32847a] text-white": primary,
      "bg-[#292929] text-white": secondary,
      "rounded-full": rounded,
      "bg-white": outline,
      "text-blue-500": outline && primary,
      "text-gray-900": outline && secondary,
      "text-green-500": outline && success,
      "text-yellow-500": outline && warning,
      "text-red-500": outline && danger,
    })
  );

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}

//primary-secondary vs gibi özelliklerin sadece birinin true olmasını sağlar. Onun haricinde hata verir.
AadoButton.propTypes = {
  checkVariationValue: ({ primary, secondary, success, warning, danger }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!warning) +
      Number(!!success) +
      Number(!!danger);

    if (count > 1) {
      return new Error("Only one of them can be true");
    }
  },
};
export default AadoButton;
