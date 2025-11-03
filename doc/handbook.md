1. ENV

    prepare a .env.local with content

    ```
    NEXT_PUBLIC_SUPABASE_URL=
    NEXT_PUBLIC_SUPABASE_ANON_KEY=
    SUPABASE_SERVICE_ROLE_KEY=
    SUPABASE_STORAGE_BUCKET_NAME=
    RESEND_API_KEY=
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
    OPENAI_API_KEY=
    NEXT_PUBLIC_CHATKIT_WORKFLOW_ID=
    ```

2. Email Notification

    config the file src/config/email.ts

    ```
    // receiver shoulbd be developer or costumer
    export const toAddress =
    process.env.NEXT_PUBLIC_MANAGER_EMAIL ?? 'zhangsu1305@gmail.com';

    // don't change it generally
    export const fromAddress =
    process.env.NEXT_PUBLIC_RESEND_FROM ?? 'IT Support <support@notifications.sparklerunner.com.au>';
    ```

3. Database

    run src/db/init.sql in pgsql such as supabase sql editor
