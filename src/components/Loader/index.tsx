import { Backdrop, CircularProgress } from "@mui/material";
import { useCallback, useState } from "react";
import { Emitter, useEmitter } from "../../hooks/useEmitter";

const loaderEmitter = new Emitter(0);

export default function Loader() {
  const loaderCount = useEmitter(loaderEmitter);
  return (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loaderCount > 0}>
      <CircularProgress />
    </Backdrop>
  );
}

export const LoaderUtil = {
  show: () => {
    loaderEmitter.emit(loaderEmitter.data + 1);
  },
  hide: () => {
    if (loaderEmitter.data > 0) {
      loaderEmitter.emit(loaderEmitter.data - 1);
    }
  },
};

export const withLoader = async (callback: () => void) => {
  LoaderUtil.show();
  try {
    await callback();
  } catch (err) {
    console.log(err);
  }
  LoaderUtil.hide();
};

export function useLoader(loadingEl: JSX.Element) {
  const [loading, setLoading] = useState(false);

  const el = loading ? loadingEl : null;
  const show = useCallback(() => setLoading(true), []);
  const hide = useCallback(() => setLoading(false), []);

  return {
    loading,
    el,
    show,
    hide
  };
}
