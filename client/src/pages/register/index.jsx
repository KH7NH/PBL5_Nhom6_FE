import Logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import path from "@/constants/path";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/apis/auth.api";
import { toast } from "sonner";
import _ from "lodash";
import { useContext } from "react";
import { AppContext } from "@/contexts/app.context";
import { setAccessTokenToLS } from "@/utils/auth";

const usernameSchema = z
  .string()
  .min(6, {
    message: "Tài khoản bắt buộc có 6 - 12 ký tự",
  }) // 6 chars min
  .max(12, {
    message: "Tài khoản bắt buộc có 6 - 12 ký tự",
  }) // 12 chars max
  .regex(/^[a-z0-9]+$/i, { message: "Chỉ chứa chữ thường và số" })
  .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/, {
    message: "Phải chứa ít nhất 1 chữ hoặc 1 số",
  });
const passwordSchema = z
  .string()
  .min(6, {
    message: "Mật khẩu bắt buộc có 6 - 12 ký tự",
  }) // 6 chars min
  .max(12, {
    message: "Mật khẩu bắt buộc có 6 - 12 ký tự",
  }) // 12 chars max
  .regex(/^[a-z0-9]+$/i, { message: "Chỉ chứa chữ thường và số" })
  .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/, {
    message: "Phải chứa ít nhất 1 chữ hoặc 1 số",
  });

const formSchema = z
  .object({
    username: usernameSchema,
    email: z.string().email({ message: "Email bắt buộc" }),
    password: passwordSchema,
    re_password: z.string().min(6, {
      message: "Mật khẩu xác nhận bắt buộc có 6 - 12 ký tự",
    }),
  })
  .superRefine(({ password, re_password }, ctx) => {
    if (password !== re_password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu xác nhận không chính xác",
        path: ["re_password"],
      });
    }
  });

const RegisterPage = () => {
  const { setIsAuthenticated, setToken } = useContext(AppContext);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      re_password: "",
    },
  });
  const registerMutation = useMutation({
    mutationFn: async (data) => authApi.register(data),
    onSuccess: (data) => {
      setAccessTokenToLS(data?.data?.token);
      setToken(data?.data?.token);
      setIsAuthenticated(true);
      toast.success("Đăng ký thành công");
      form.reset();
    },
  });

  const onSubmit = (data) => {
    registerMutation.mutate(_.omit(data, "re_password"));
  };
  return (
    <div className="w-screen h-screen bg-gradient-to-b from-[#00B8D9] to-[#DFF0F3]">
      <div className="flex flex-col justify-center items-center py-12 mx-0">
        <section className="auth-form flex flex-col mx-auto my-0 w-[400px] py-8 px-10 bg-white rounded-sm shadow-md box-border text-text1">
          <div className="flex flex-col justify-center items-center text-center mb-4">
            <Link to={path.home} className="inline-block relative h-14">
              <img className="h-full" src={Logo} alt="" />
            </Link>
            <div className="flex flex-col pt-6 justify-center items-center">
              <h5 className="font-semibold leading-5 text-text1">Đăng ký</h5>
            </div>
          </div>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full"
                          type="text"
                          placeholder="Tên tài khoản"
                        />
                      </FormControl>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full"
                          type="text"
                          placeholder="Email"
                        />
                      </FormControl>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full"
                          type="password"
                          placeholder="Mật khẩu"
                        />
                      </FormControl>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="re_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full"
                          type="password"
                          placeholder="Nhập lại mật khẩu"
                        />
                      </FormControl>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />
                <Button type="submit" variant="main" className="w-full">
                  Đăng ký ngay
                </Button>
              </form>
            </Form>
          </div>
          <div className="w-full mt-6">
            <p className="text-sm text-center">Hoặc tiếp tục với:</p>
          </div>
          <div className="w-full flex flex-col gap-4 mt-2 text-text2">
            <button className="w-full flex justify-center items-center text-center text-sm border border-slate-300 rounded-sm leading-9 font-semibold">
              <img
                className="w-6 h-6 mr-2 block"
                src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/google-logo.5867462c.svg"
                alt
              />
              <span>Google</span>
            </button>
          </div>
          <div className="w-full flex flex-col items-center gap-2 text-center">
            <Link
              to={path.login}
              className="text-blue-600 text-sm text-center inline-block mt-6"
            >
              Bạn đã có tài khoản ? Đăng nhập ngay
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RegisterPage;
