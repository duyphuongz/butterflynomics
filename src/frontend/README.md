# Butterflynomics — Frontend

Landing page và trang đăng nhập/đăng ký (Vite + React + TypeScript strict, Tailwind v4 chỉ cho layout) dựng trên Design System ở `../../butterflynomics-design-system/`. Spec: `../../docs/specs/001-landing-page.md`, `../../docs/specs/003-login-page.md`; quyết định stack: `../../docs/adr/0001-frontend-stack.md`.

## Chạy

Cần Node LTS và pnpm (`corepack enable`).

```
pnpm install
pnpm dev          # http://localhost:5173
pnpm build        # tsc -b + vite build → dist/
pnpm preview
pnpm typecheck
pnpm lint         # kiểm tra mã hex trong src + eslint
pnpm test         # vitest
```

## Design System được nạp thế nào

- **Không sao chép** vào `frontend/`. Alias Vite `@ds` → `../../butterflynomics-design-system`, `server.fs.allow` mở thư mục đó. Repo phải giữ `src/` và `butterflynomics-design-system/` cạnh nhau ở thư mục gốc.
- `src/styles/globals.css` khai báo thứ tự layer `theme, base, ds, utilities`, nạp `fonts.css`, `tokens.css`, `components/bundle.css` vào layer `ds`, nên Tailwind utility chỉnh được bố cục nhưng không phải nơi đặt màu/chữ. `@theme` chỉ alias biến của Design System (không mã màu; `pnpm lint` thất bại nếu có mã hex trong `src`).
- Plugin trong `vite.config.ts` nhúng `tokens.css` và `bundle.css` vào `globals.css` trong bộ nhớ, bỏ mảnh `@import` hỏng ở dòng đầu `bundle.css` (lỗi DS-1) và dòng `@import url("fonts/fonts.css")` (đã nạp riêng). Không sửa tệp nào của Design System. Khi Design System được sửa, có thể bỏ phần xử lý này.
- Font: woff2 tự host từ `fonts/files`, Vite băm tên và đưa vào `dist/assets`. Không gọi Google Fonts.
- Wordmark: `<img>` từ `assets/Logo/butterflynomics-wordmark-inverse.svg`. Favicon `/favicon.svg` do plugin `dsFavicon` lấy từ `butterflynomics-mark.svg` (dev và build).
- Theme: `data-theme` `light` | `light-cb` trên `<html>`, lưu `localStorage` (`bn-theme`), áp trước khi render ở `src/main.tsx`.

## Sửa copy

Chữ riêng của landing và dữ liệu minh họa nằm ở `src/features/landing/content.ts` (hero, các section, đồ thị `graph`, bằng chứng `evidence`, bảng `reportRows`). Chữ dùng chung toàn site (nav, footer, tuyên bố giới hạn, 404) nằm ở `src/config/siteContent.ts`; URL ngoài ở `src/config/appConfig.ts`. Thuật ngữ trong đoạn văn là phần tử `{ term, def }` (hiển thị bằng `Term`). Mọi dữ liệu mẫu phải giữ nhãn minh họa.

## Cấu trúc

```
frontend/
  public/                robots.txt (favicon lấy từ Design System qua plugin)
  index.html             entry của Vite (nằm ở gốc, không ở public/)
  tests/                 setup.ts, test tích hợp nhiều trang (landing.integration.test.tsx)
  src/
    components/
      common/<Tên>/      lớp bọc bn-*: Tên.tsx, Tên.test.tsx (nếu có), index.ts
      layout/<Tên>/      TopBar, Footer
    features/
      landing/           index.ts (API công khai), components/ (các section),
                         content.ts (copy + dữ liệu minh họa), content.test.ts (bất biến dữ liệu)
      auth/              index.ts, components/ (AuthLayout, LoginForm, SignupForm, PasswordStrength),
                         services/ (mockAuth, rememberedEmail), content.ts, validation.ts
    pages/               Home, Login, Signup, NotFound (mỗi route một trang)
    routes/AppRoutes.tsx
    hooks/               useEvidence
    utils/               cx, theme, layout (lớp Tailwind dùng chung)
    types/               content.types.ts
    config/              appConfig.ts (URL ngoài, ROUTES), siteContent.ts (chữ dùng chung toàn site)
    styles/              globals.css (layer + @theme alias Design System),
                         overrides.css (giải pháp tạm --app-/.app-, xem spec 003 L8, L9)
    App.tsx  main.tsx
```

Quy ước tổ chức:

- Import dùng alias `@/` → `src/`; `./` chỉ cho tệp cùng thư mục.
- Phụ thuộc một chiều `pages → features → components → hooks/utils/types/config`. `components/` không import từ `features/`; hai tính năng không import lẫn nhau.
- `pages/` chỉ import một tính năng qua `@/features/<tên>` (tệp `index.ts`), không vào tệp bên trong.
- Đường dẫn route chỉ khai báo một chỗ: `ROUTES` trong `config/appConfig.ts`.
- Test đặt cạnh tệp; test component dùng dữ liệu cố định của riêng nó, không lấy nội dung từ `features/`.

Thư mục `context/`, `store/`, `src/services/`, `assets/` của mẫu chưa tạo vì chưa có nội dung (xem `agent-rules/03-frontend-conventions.md`). Đăng nhập/đăng ký hiện là mock (`features/auth/services/`), chưa gọi backend.
