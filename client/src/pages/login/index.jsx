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
import { AppContext } from "@/contexts/app.context";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/apis/auth.api";
import { setAccessTokenToLS, setProfileToLS } from "@/utils/auth";
import { toast } from "sonner";

const formSchema = z.object({
  username: z.string("Username bắt buộc").min(1, "Username bắt buộc"),
  password: z.string("Mật khẩu bắt buộc").min(1, "Mật khẩu bắt buộc"),
});

const LoginPage = () => {
  const { setIsAuthenticated, setToken, setProfile } = useContext(AppContext);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const loginMutation = useMutation({
    mutationFn: async (data) => authApi.login(data),
    onSuccess: (data) => {
      setAccessTokenToLS(data?.data?.token);
      setToken(data?.data?.token);
      setProfile(data?.data?.result);
      setProfileToLS(data?.data?.result);
      setIsAuthenticated(true);
      toast.success("Đăng nhập thành công");
      form.reset();
      location.reload();
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
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
              <h5 className="font-semibold leading-5 text-text1">Đăng nhập</h5>
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
                <Button variant="main" className="w-full">
                  Đăng nhập
                </Button>
              </form>
            </Form>
          </div>
          <div className="w-full mt-6">
            <p className="text-sm text-center">Hoặc đăng nhập với:</p>
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
              to={path.register}
              className="text-blue-600 text-sm text-center inline-block mt-6"
            >
              Bạn chưa có tài khoản ? Đăng ký ngay
            </Link>
            <Link
              className="text-red-600 text-sm text-center inline-block"
              to={path.home}
            >
              Quên mật khẩu
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
