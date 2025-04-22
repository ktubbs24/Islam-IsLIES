# Code Citations

## License: unknown
https://github.com/vokz/vokz.github.io/tree/35c9597a47a08db6d4240fd1ac8a57f9a610dff4/src/components/ui/toaster.tsx

```
>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title &&
```


## License: MIT
https://github.com/aniftyco/nifty-ui/tree/7e87e8aac645f9a5bd21e16436a02dcd9b929820/packages/nifty-ui/src/components/Toaster.tsx

```
toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className=
```


## License: GPL_2_0
https://github.com/AdisonCavani/todo-list/tree/84016bae87515a4b56131f41d19460dea5d032b1/frontend/components/ui/toaster.tsx

```
ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={
```


## License: unknown
https://github.com/Blklight/board/tree/eae4a3d43f3eecc6e878a72479fef0d88482a29e/components/ui/toaster.tsx

```
toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function
```


## License: unknown
https://github.com/AFPedreros/redencion-facturas-cliente/tree/fe5da19c28cf918b39286e5e666435db92f88b63/components/ui/toaster.tsx

```
@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
```

