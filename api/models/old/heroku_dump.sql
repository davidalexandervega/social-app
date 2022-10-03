--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY "public"."django_admin_log" DROP CONSTRAINT IF EXISTS "django_admin_log_user_id_c564eba6_fk_app_user_id";
ALTER TABLE IF EXISTS ONLY "public"."django_admin_log" DROP CONSTRAINT IF EXISTS "django_admin_log_content_type_id_c4bce8eb_fk_django_co";
ALTER TABLE IF EXISTS ONLY "public"."auth_permission" DROP CONSTRAINT IF EXISTS "auth_permission_content_type_id_2f476e4b_fk_django_co";
ALTER TABLE IF EXISTS ONLY "public"."auth_group_permissions" DROP CONSTRAINT IF EXISTS "auth_group_permissions_group_id_b120cbf9_fk_auth_group_id";
ALTER TABLE IF EXISTS ONLY "public"."auth_group_permissions" DROP CONSTRAINT IF EXISTS "auth_group_permissio_permission_id_84c5c92e_fk_auth_perm";
ALTER TABLE IF EXISTS ONLY "public"."app_user_user_permissions" DROP CONSTRAINT IF EXISTS "app_user_user_permissions_user_id_24780b52_fk_app_user_id";
ALTER TABLE IF EXISTS ONLY "public"."app_user_user_permissions" DROP CONSTRAINT IF EXISTS "app_user_user_permis_permission_id_4ef8e133_fk_auth_perm";
ALTER TABLE IF EXISTS ONLY "public"."app_user_groups" DROP CONSTRAINT IF EXISTS "app_user_groups_user_id_e6f878f6_fk_app_user_id";
ALTER TABLE IF EXISTS ONLY "public"."app_user_groups" DROP CONSTRAINT IF EXISTS "app_user_groups_group_id_e774d92c_fk_auth_group_id";
ALTER TABLE IF EXISTS ONLY "public"."app_reply" DROP CONSTRAINT IF EXISTS "app_reply_user_id_9166edce_fk_app_user_id";
ALTER TABLE IF EXISTS ONLY "public"."app_reply" DROP CONSTRAINT IF EXISTS "app_reply_origin_id_589ff682_fk_app_post_id";
ALTER TABLE IF EXISTS ONLY "public"."app_post" DROP CONSTRAINT IF EXISTS "app_post_user_id_c2bbada6_fk_app_user_id";
ALTER TABLE IF EXISTS ONLY "public"."app_notification" DROP CONSTRAINT IF EXISTS "app_notification_recipientID_id_5825dcc2_fk_app_user_id";
ALTER TABLE IF EXISTS ONLY "public"."app_notification" DROP CONSTRAINT IF EXISTS "app_notification_creatorID_id_c3aaa6c3_fk_app_user_id";
DROP INDEX IF EXISTS "public"."django_session_session_key_c0390e0f_like";
DROP INDEX IF EXISTS "public"."django_session_expire_date_a5c62663";
DROP INDEX IF EXISTS "public"."django_admin_log_user_id_c564eba6";
DROP INDEX IF EXISTS "public"."django_admin_log_content_type_id_c4bce8eb";
DROP INDEX IF EXISTS "public"."auth_permission_content_type_id_2f476e4b";
DROP INDEX IF EXISTS "public"."auth_group_permissions_permission_id_84c5c92e";
DROP INDEX IF EXISTS "public"."auth_group_permissions_group_id_b120cbf9";
DROP INDEX IF EXISTS "public"."auth_group_name_a6ea08ec_like";
DROP INDEX IF EXISTS "public"."app_user_username_9d6296ff_like";
DROP INDEX IF EXISTS "public"."app_user_user_permissions_user_id_24780b52";
DROP INDEX IF EXISTS "public"."app_user_user_permissions_permission_id_4ef8e133";
DROP INDEX IF EXISTS "public"."app_user_groups_user_id_e6f878f6";
DROP INDEX IF EXISTS "public"."app_user_groups_group_id_e774d92c";
DROP INDEX IF EXISTS "public"."app_reply_user_id_9166edce";
DROP INDEX IF EXISTS "public"."app_reply_origin_id_589ff682";
DROP INDEX IF EXISTS "public"."app_post_user_id_c2bbada6";
DROP INDEX IF EXISTS "public"."app_notification_target_id_ec40e651";
DROP INDEX IF EXISTS "public"."app_notification_creator_id_b3d1ebd5";
ALTER TABLE IF EXISTS ONLY "public"."django_session" DROP CONSTRAINT IF EXISTS "django_session_pkey";
ALTER TABLE IF EXISTS ONLY "public"."django_migrations" DROP CONSTRAINT IF EXISTS "django_migrations_pkey";
ALTER TABLE IF EXISTS ONLY "public"."django_content_type" DROP CONSTRAINT IF EXISTS "django_content_type_pkey";
ALTER TABLE IF EXISTS ONLY "public"."django_content_type" DROP CONSTRAINT IF EXISTS "django_content_type_app_label_model_76bd3d3b_uniq";
ALTER TABLE IF EXISTS ONLY "public"."django_admin_log" DROP CONSTRAINT IF EXISTS "django_admin_log_pkey";
ALTER TABLE IF EXISTS ONLY "public"."auth_permission" DROP CONSTRAINT IF EXISTS "auth_permission_pkey";
ALTER TABLE IF EXISTS ONLY "public"."auth_permission" DROP CONSTRAINT IF EXISTS "auth_permission_content_type_id_codename_01ab375a_uniq";
ALTER TABLE IF EXISTS ONLY "public"."auth_group" DROP CONSTRAINT IF EXISTS "auth_group_pkey";
ALTER TABLE IF EXISTS ONLY "public"."auth_group_permissions" DROP CONSTRAINT IF EXISTS "auth_group_permissions_pkey";
ALTER TABLE IF EXISTS ONLY "public"."auth_group_permissions" DROP CONSTRAINT IF EXISTS "auth_group_permissions_group_id_permission_id_0cd325b0_uniq";
ALTER TABLE IF EXISTS ONLY "public"."auth_group" DROP CONSTRAINT IF EXISTS "auth_group_name_key";
ALTER TABLE IF EXISTS ONLY "public"."app_user" DROP CONSTRAINT IF EXISTS "app_user_username_key";
ALTER TABLE IF EXISTS ONLY "public"."app_user_user_permissions" DROP CONSTRAINT IF EXISTS "app_user_user_permissions_user_id_permission_id_7c8316ce_uniq";
ALTER TABLE IF EXISTS ONLY "public"."app_user_user_permissions" DROP CONSTRAINT IF EXISTS "app_user_user_permissions_pkey";
ALTER TABLE IF EXISTS ONLY "public"."app_user" DROP CONSTRAINT IF EXISTS "app_user_pkey";
ALTER TABLE IF EXISTS ONLY "public"."app_user_groups" DROP CONSTRAINT IF EXISTS "app_user_groups_user_id_group_id_73b8e940_uniq";
ALTER TABLE IF EXISTS ONLY "public"."app_user_groups" DROP CONSTRAINT IF EXISTS "app_user_groups_pkey";
ALTER TABLE IF EXISTS ONLY "public"."app_reply" DROP CONSTRAINT IF EXISTS "app_reply_pkey";
ALTER TABLE IF EXISTS ONLY "public"."app_post" DROP CONSTRAINT IF EXISTS "app_post_pkey";
ALTER TABLE IF EXISTS ONLY "public"."app_notification" DROP CONSTRAINT IF EXISTS "app_notification_pkey";
ALTER TABLE IF EXISTS "public"."django_migrations" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."django_content_type" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."django_admin_log" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."auth_permission" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."auth_group_permissions" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."auth_group" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."app_user_user_permissions" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "public"."app_user_groups" ALTER COLUMN "id" DROP DEFAULT;
DROP TABLE IF EXISTS "public"."django_session";
DROP SEQUENCE IF EXISTS "public"."django_migrations_id_seq";
DROP TABLE IF EXISTS "public"."django_migrations";
DROP SEQUENCE IF EXISTS "public"."django_content_type_id_seq";
DROP TABLE IF EXISTS "public"."django_content_type";
DROP SEQUENCE IF EXISTS "public"."django_admin_log_id_seq";
DROP TABLE IF EXISTS "public"."django_admin_log";
DROP SEQUENCE IF EXISTS "public"."auth_permission_id_seq";
DROP TABLE IF EXISTS "public"."auth_permission";
DROP SEQUENCE IF EXISTS "public"."auth_group_permissions_id_seq";
DROP TABLE IF EXISTS "public"."auth_group_permissions";
DROP SEQUENCE IF EXISTS "public"."auth_group_id_seq";
DROP TABLE IF EXISTS "public"."auth_group";
DROP SEQUENCE IF EXISTS "public"."app_user_user_permissions_id_seq";
DROP TABLE IF EXISTS "public"."app_user_user_permissions";
DROP SEQUENCE IF EXISTS "public"."app_user_groups_id_seq";
DROP TABLE IF EXISTS "public"."app_user_groups";
DROP TABLE IF EXISTS "public"."app_user";
DROP TABLE IF EXISTS "public"."app_reply";
DROP TABLE IF EXISTS "public"."app_post";
DROP TABLE IF EXISTS "public"."app_notification";
DROP SCHEMA IF EXISTS "heroku_ext";
--
-- Name: heroku_ext; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "heroku_ext";


SET default_tablespace = '';

SET default_table_access_method = "heap";

--
-- Name: app_notification; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."app_notification" (
    "id" "uuid" NOT NULL,
    "type" character varying(200) NOT NULL,
    "object" "uuid" NOT NULL,
    "creatorID_id" "uuid" NOT NULL,
    "recipientID_id" "uuid" NOT NULL,
    "creatorUsername" character varying(200) NOT NULL,
    "time" timestamp with time zone NOT NULL,
    "seen" boolean NOT NULL,
    "creatorPictureID" character varying(255) NOT NULL
);


--
-- Name: app_post; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."app_post" (
    "id" "uuid" NOT NULL,
    "body" character varying(200) NOT NULL,
    "time" timestamp with time zone NOT NULL,
    "likes" "uuid"[] NOT NULL,
    "user_id" "uuid" NOT NULL,
    "image" boolean NOT NULL,
    "replies" "uuid"[] NOT NULL,
    "username" character varying(200) NOT NULL,
    "userPictureID" character varying(255) NOT NULL
);


--
-- Name: app_reply; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."app_reply" (
    "id" "uuid" NOT NULL,
    "image" boolean NOT NULL,
    "body" character varying(200) NOT NULL,
    "time" timestamp with time zone NOT NULL,
    "likes" "uuid"[] NOT NULL,
    "origin_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "username" character varying(200) NOT NULL,
    "userPictureID" character varying(255) NOT NULL
);


--
-- Name: app_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."app_user" (
    "last_login" timestamp with time zone,
    "is_superuser" boolean NOT NULL,
    "id" "uuid" NOT NULL,
    "email" character varying(765) NOT NULL,
    "username" character varying(765) NOT NULL,
    "password" character varying(255) NOT NULL,
    "bio" character varying(200) NOT NULL,
    "following" "uuid"[] NOT NULL,
    "followers" "uuid"[] NOT NULL,
    "created" timestamp with time zone NOT NULL,
    "bannerID" character varying(255) NOT NULL,
    "pictureID" character varying(255) NOT NULL
);


--
-- Name: app_user_groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."app_user_groups" (
    "id" bigint NOT NULL,
    "user_id" "uuid" NOT NULL,
    "group_id" integer NOT NULL
);


--
-- Name: app_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."app_user_groups_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: app_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."app_user_groups_id_seq" OWNED BY "public"."app_user_groups"."id";


--
-- Name: app_user_user_permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."app_user_user_permissions" (
    "id" bigint NOT NULL,
    "user_id" "uuid" NOT NULL,
    "permission_id" integer NOT NULL
);


--
-- Name: app_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."app_user_user_permissions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: app_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."app_user_user_permissions_id_seq" OWNED BY "public"."app_user_user_permissions"."id";


--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."auth_group" (
    "id" integer NOT NULL,
    "name" character varying(150) NOT NULL
);


--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."auth_group_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."auth_group_id_seq" OWNED BY "public"."auth_group"."id";


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."auth_group_permissions" (
    "id" bigint NOT NULL,
    "group_id" integer NOT NULL,
    "permission_id" integer NOT NULL
);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."auth_group_permissions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."auth_group_permissions_id_seq" OWNED BY "public"."auth_group_permissions"."id";


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."auth_permission" (
    "id" integer NOT NULL,
    "name" character varying(255) NOT NULL,
    "content_type_id" integer NOT NULL,
    "codename" character varying(100) NOT NULL
);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."auth_permission_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."auth_permission_id_seq" OWNED BY "public"."auth_permission"."id";


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."django_admin_log" (
    "id" integer NOT NULL,
    "action_time" timestamp with time zone NOT NULL,
    "object_id" "text",
    "object_repr" character varying(200) NOT NULL,
    "action_flag" smallint NOT NULL,
    "change_message" "text" NOT NULL,
    "content_type_id" integer,
    "user_id" "uuid" NOT NULL,
    CONSTRAINT "django_admin_log_action_flag_check" CHECK (("action_flag" >= 0))
);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."django_admin_log_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."django_admin_log_id_seq" OWNED BY "public"."django_admin_log"."id";


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."django_content_type" (
    "id" integer NOT NULL,
    "app_label" character varying(100) NOT NULL,
    "model" character varying(100) NOT NULL
);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."django_content_type_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."django_content_type_id_seq" OWNED BY "public"."django_content_type"."id";


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."django_migrations" (
    "id" bigint NOT NULL,
    "app" character varying(255) NOT NULL,
    "name" character varying(255) NOT NULL,
    "applied" timestamp with time zone NOT NULL
);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "public"."django_migrations_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "public"."django_migrations_id_seq" OWNED BY "public"."django_migrations"."id";


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "public"."django_session" (
    "session_key" character varying(40) NOT NULL,
    "session_data" "text" NOT NULL,
    "expire_date" timestamp with time zone NOT NULL
);


--
-- Name: app_user_groups id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."app_user_groups" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."app_user_groups_id_seq"'::"regclass");


--
-- Name: app_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."app_user_user_permissions" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."app_user_user_permissions_id_seq"'::"regclass");


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."auth_group" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."auth_group_id_seq"'::"regclass");


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."auth_group_permissions" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."auth_group_permissions_id_seq"'::"regclass");


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."auth_permission" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."auth_permission_id_seq"'::"regclass");


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."django_admin_log" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."django_admin_log_id_seq"'::"regclass");


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."django_content_type" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."django_content_type_id_seq"'::"regclass");


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."django_migrations" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."django_migrations_id_seq"'::"regclass");


--
-- Data for Name: app_notification; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."app_notification" ("id", "type", "object", "creatorID_id", "recipientID_id", "creatorUsername", "time", "seen", "creatorPictureID") FROM stdin;
db734fb2-3b75-4b21-8b8f-cf0cdbc66be6	reply_post	82b0bfa1-8adf-4b92-813f-75799d936b2b	0ced1f9d-2318-4301-83af-100cdd013e3b	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	hydroxide	2022-09-25 23:52:40.365+00	t	1664272192
be5c80b8-ff47-4008-842b-ec31f8076bfc	follow_user	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	0ced1f9d-2318-4301-83af-100cdd013e3b	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	hydroxide	2022-09-26 21:42:36.519+00	t	1664272192
4c633466-b317-468b-8fb1-9d274ded50f7	reply_post	35f762fe-7a85-4de8-8dc3-ae9a76d58a84	0ced1f9d-2318-4301-83af-100cdd013e3b	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	hydroxide	2022-09-26 19:20:32.993+00	t	1664272192
561dccfb-3714-4210-b588-fafe3edc30a6	reply_post	305ae81c-f666-4831-ab7f-cc4e17572b6e	0ced1f9d-2318-4301-83af-100cdd013e3b	0ced1f9d-2318-4301-83af-100cdd013e3b	hydroxide	2022-08-30 22:25:33.752+00	t	1664272192
285bd517-f4d7-438e-a7cd-483860d44fd7	like_post	82b0bfa1-8adf-4b92-813f-75799d936b2b	0ced1f9d-2318-4301-83af-100cdd013e3b	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	hydroxide	2022-09-19 20:37:16.01+00	t	1664272192
832ea546-2230-402c-a0bd-433fbf3097c2	like_post	35f762fe-7a85-4de8-8dc3-ae9a76d58a84	0ced1f9d-2318-4301-83af-100cdd013e3b	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	hydroxide	2022-09-22 20:23:16.012+00	t	1664272192
c5648ee2-5c78-4f01-b337-7f0f219ebbe7	reply_post	35f762fe-7a85-4de8-8dc3-ae9a76d58a84	0ced1f9d-2318-4301-83af-100cdd013e3b	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	hydroxide	2022-09-25 04:02:01.663+00	t	1664272192
4c7908f2-ed07-419a-a17a-4b59cbea1a35	like_post	35f762fe-7a85-4de8-8dc3-ae9a76d58a84	0ced1f9d-2318-4301-83af-100cdd013e3b	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	hydroxide	2022-09-22 20:05:17.029+00	t	1664272192
764c3eb0-8568-4d8c-8386-c79697a9b726	reply_post	35f762fe-7a85-4de8-8dc3-ae9a76d58a84	0ced1f9d-2318-4301-83af-100cdd013e3b	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	hydroxide	2022-09-25 04:02:15.139+00	t	1664272192
639a8a45-1d2e-476a-8da6-3de7c453e077	follow_user	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	0ced1f9d-2318-4301-83af-100cdd013e3b	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	hydroxide	2022-09-29 03:18:04.508+00	f	1664272192
bc9fd9a6-0158-45b6-9446-a4c125e003f1	reply_post	35f762fe-7a85-4de8-8dc3-ae9a76d58a84	0ced1f9d-2318-4301-83af-100cdd013e3b	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	hydroxide	2022-09-27 03:01:42.584+00	f	1664272192
2abf923c-9372-4831-a602-3439902d619d	like_post	c81747bf-599c-40eb-bf5f-33ae1d83f22d	0ced1f9d-2318-4301-83af-100cdd013e3b	0ced1f9d-2318-4301-83af-100cdd013e3b	hydroxide	2022-08-30 22:22:44.61+00	t	1664272192
897806fe-b199-4ff7-866b-b36838514ce9	like_post	82b0bfa1-8adf-4b92-813f-75799d936b2b	0ced1f9d-2318-4301-83af-100cdd013e3b	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	hydroxide	2022-09-25 04:02:27.991+00	t	1664272192
4ec0d170-6b21-4c0e-be46-58e4f2861bfb	reply_post	82b0bfa1-8adf-4b92-813f-75799d936b2b	0ced1f9d-2318-4301-83af-100cdd013e3b	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	hydroxide	2022-09-25 22:58:37.88+00	t	1664272192
9152177c-b9cf-499a-aa43-4de12dfb9507	reply_post	35f762fe-7a85-4de8-8dc3-ae9a76d58a84	0ced1f9d-2318-4301-83af-100cdd013e3b	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	hydroxide	2022-09-25 23:05:34.724+00	t	1664272192
8cdc8afe-d3df-4864-82c0-afc4b859c97d	reply_post	35f762fe-7a85-4de8-8dc3-ae9a76d58a84	0ced1f9d-2318-4301-83af-100cdd013e3b	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	hydroxide	2022-09-25 23:46:47.012+00	t	1664272192
8cb9bf17-3bfd-4578-bc2c-080730fe37ae	reply_post	35f762fe-7a85-4de8-8dc3-ae9a76d58a84	0ced1f9d-2318-4301-83af-100cdd013e3b	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	hydroxide	2022-09-25 23:09:42.955+00	t	1664272192
fd590f45-6646-43d7-a357-00b36263c740	reply_post	82b0bfa1-8adf-4b92-813f-75799d936b2b	0ced1f9d-2318-4301-83af-100cdd013e3b	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	hydroxide	2022-09-25 23:17:20.343+00	t	1664272192
01adeab8-3d7c-4528-92ed-f7da2c346a16	reply_post	35f762fe-7a85-4de8-8dc3-ae9a76d58a84	0ced1f9d-2318-4301-83af-100cdd013e3b	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	hydroxide	2022-09-25 23:47:34.766+00	t	1664272192
d2a8b82c-f036-4bb6-a42e-0a91e8d13ad0	reply_post	35f762fe-7a85-4de8-8dc3-ae9a76d58a84	0ced1f9d-2318-4301-83af-100cdd013e3b	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	hydroxide	2022-09-25 23:45:13.774+00	t	1664272192
0b0e7cda-b46f-4bcd-aa6a-884977205e7d	reply_post	35f762fe-7a85-4de8-8dc3-ae9a76d58a84	0ced1f9d-2318-4301-83af-100cdd013e3b	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	hydroxide	2022-09-25 23:38:37.983+00	t	1664272192
e362feb3-e824-43a6-8936-7244b9fd6ea1	reply_post	35f762fe-7a85-4de8-8dc3-ae9a76d58a84	0ced1f9d-2318-4301-83af-100cdd013e3b	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	hydroxide	2022-09-25 23:47:54.448+00	t	1664272192
1abf8d4e-20a2-4dd5-aa65-97860934596c	follow_user	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	0ced1f9d-2318-4301-83af-100cdd013e3b	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	hydroxide	2022-09-27 23:30:12.559+00	f	1664272192
a46d6319-1929-48fc-b29d-920465f47d60	reply_post	35f762fe-7a85-4de8-8dc3-ae9a76d58a84	0ced1f9d-2318-4301-83af-100cdd013e3b	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	hydroxide	2022-09-25 23:48:38.52+00	t	1664272192
9a8a2221-1d31-4629-ba8c-a3e956795b33	like_post	35f762fe-7a85-4de8-8dc3-ae9a76d58a84	0ced1f9d-2318-4301-83af-100cdd013e3b	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	hydroxide	2022-09-22 20:25:10.543+00	t	1664272192
7b328155-e26e-4df2-9e77-da50f1b729c1	reply_post	49e27906-beee-45dd-9955-62c86c457bdf	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	0ced1f9d-2318-4301-83af-100cdd013e3b	invizible	2022-09-19 20:02:36.985+00	t	1664255866727
332d41bc-9938-4115-b082-c294516e02fe	like_post	6ffbd656-25ff-42a3-be2d-502134ef6ebb	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	0ced1f9d-2318-4301-83af-100cdd013e3b	invizible	2022-09-19 20:16:13.294+00	t	1664255866727
6bb638ca-6a51-4a22-8427-582dc1cf4731	like_post	12514fb7-4774-4b72-8e75-80e5d091bb16	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	0ced1f9d-2318-4301-83af-100cdd013e3b	invizible	2022-09-19 20:36:29.362+00	t	1664255866727
be1afefa-63b5-4bdd-b013-0697cffcdc8e	like_post	0cdaf44c-15d2-4724-be2d-5c3606a42b35	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	0ced1f9d-2318-4301-83af-100cdd013e3b	invizible	2022-09-26 21:08:25.09+00	t	1664255866727
644b7df2-be33-4848-bb96-49adc0f32840	follow_user	0ced1f9d-2318-4301-83af-100cdd013e3b	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	0ced1f9d-2318-4301-83af-100cdd013e3b	invizible	2022-09-26 21:49:15.951+00	t	1664255866727
850a47c2-5215-4d17-b696-bd7d796f3b7a	follow_user	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	0ced1f9d-2318-4301-83af-100cdd013e3b	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	hydroxide	2022-09-27 23:30:19.882+00	f	1664272192
\.


--
-- Data for Name: app_post; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."app_post" ("id", "body", "time", "likes", "user_id", "image", "replies", "username", "userPictureID") FROM stdin;
a4256b47-2a18-49c6-a985-430ed913334c	don't follow me because i'm lost too!!!	2022-09-26 22:05:59.392+00	{}	0ced1f9d-2318-4301-83af-100cdd013e3b	f	{81c288ae-6979-40e3-8449-f56a46ec0fa9}	hydroxide	1664272192
12514fb7-4774-4b72-8e75-80e5d091bb16	tthhoouugghhttss	2022-09-15 01:47:36.336+00	{f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7}	0ced1f9d-2318-4301-83af-100cdd013e3b	f	{}	hydroxide	1664272192
0cdaf44c-15d2-4724-be2d-5c3606a42b35	notificaitioncifnaitonciatonaiconations	2022-08-30 22:48:21.743+00	{f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7}	0ced1f9d-2318-4301-83af-100cdd013e3b	f	{544c8365-b487-48a9-82c3-8e3c5700809a,34fbda24-24bd-489b-b245-66c1508df9bc}	hydroxide	1664272192
49e27906-beee-45dd-9955-62c86c457bdf	yooo!	2022-08-27 03:30:33.826+00	{0ced1f9d-2318-4301-83af-100cdd013e3b}	0ced1f9d-2318-4301-83af-100cdd013e3b	t	{bc2791eb-dade-4978-82a7-c94ffac637fa}	hydroxide	1664272192
c81747bf-599c-40eb-bf5f-33ae1d83f22d	pr3i.mav.era	2022-08-27 06:15:42.804+00	{0ced1f9d-2318-4301-83af-100cdd013e3b}	0ced1f9d-2318-4301-83af-100cdd013e3b	t	{305ae81c-f666-4831-ab7f-cc4e17572b6e}	hydroxide	1664272192
6ffbd656-25ff-42a3-be2d-502134ef6ebb	almost there.	2022-09-17 03:21:39.757+00	{0ced1f9d-2318-4301-83af-100cdd013e3b,f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7}	0ced1f9d-2318-4301-83af-100cdd013e3b	t	{bd003856-40c3-4a3e-a360-242a79c26c6e}	hydroxide	1664272192
0a5f1ad1-08d2-4668-ac55-e4b2ab5f07d9	?	2022-08-27 03:03:01.537+00	{}	0ced1f9d-2318-4301-83af-100cdd013e3b	f	{}	hydroxide	1664272192
35f762fe-7a85-4de8-8dc3-ae9a76d58a84	fsfsfsssfsfs	2022-09-22 02:52:28.72+00	{0ced1f9d-2318-4301-83af-100cdd013e3b}	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	f	{68c97083-0333-4d35-ae03-2ef5f2aadab5}	invizible	1664255866727
4f994517-13bc-43df-a9b2-a10a9f901638	Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit	2022-08-31 22:51:36.84+00	{0ced1f9d-2318-4301-83af-100cdd013e3b}	0ced1f9d-2318-4301-83af-100cdd013e3b	f	{7089146f-8ea9-4dca-a0ef-942d1da1e28f}	hydroxide	1664272192
348e4cab-f635-4df9-9a9e-4f33b01c8c3b	lo.ca.tion	2022-09-26 22:37:37.477+00	{}	0ced1f9d-2318-4301-83af-100cdd013e3b	t	{}	hydroxide	1664272192
82b0bfa1-8adf-4b92-813f-75799d936b2b	player 2: invisible	2022-09-19 20:35:05.005+00	{0ced1f9d-2318-4301-83af-100cdd013e3b}	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	f	{7ca498ea-6a8f-4f56-97f8-c0820b7200be}	invizible	1664255866727
\.


--
-- Data for Name: app_reply; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."app_reply" ("id", "image", "body", "time", "likes", "origin_id", "user_id", "username", "userPictureID") FROM stdin;
544c8365-b487-48a9-82c3-8e3c5700809a	f	lol	2022-09-17 00:15:31.938+00	{}	0cdaf44c-15d2-4724-be2d-5c3606a42b35	0ced1f9d-2318-4301-83af-100cdd013e3b	hydroxide	1664272192
34fbda24-24bd-489b-b245-66c1508df9bc	f	?	2022-09-17 00:18:22.632+00	{}	0cdaf44c-15d2-4724-be2d-5c3606a42b35	0ced1f9d-2318-4301-83af-100cdd013e3b	hydroxide	1664272192
bc2791eb-dade-4978-82a7-c94ffac637fa	f	sick!	2022-08-27 05:54:00.51+00	{0ced1f9d-2318-4301-83af-100cdd013e3b}	49e27906-beee-45dd-9955-62c86c457bdf	0ced1f9d-2318-4301-83af-100cdd013e3b	hydroxide	1664272192
305ae81c-f666-4831-ab7f-cc4e17572b6e	f	beautiful...	2022-08-30 22:25:33.748+00	{}	c81747bf-599c-40eb-bf5f-33ae1d83f22d	0ced1f9d-2318-4301-83af-100cdd013e3b	hydroxide	1664272192
bd003856-40c3-4a3e-a360-242a79c26c6e	f	alright...	2022-09-22 03:37:45.689+00	{}	6ffbd656-25ff-42a3-be2d-502134ef6ebb	0ced1f9d-2318-4301-83af-100cdd013e3b	hydroxide	1664272192
68c97083-0333-4d35-ae03-2ef5f2aadab5	f	sdfsadfsa	2022-09-25 04:02:15.135+00	{}	35f762fe-7a85-4de8-8dc3-ae9a76d58a84	0ced1f9d-2318-4301-83af-100cdd013e3b	hydroxide	1664272192
7ca498ea-6a8f-4f56-97f8-c0820b7200be	f	lol	2022-09-25 22:58:37.874+00	{}	82b0bfa1-8adf-4b92-813f-75799d936b2b	0ced1f9d-2318-4301-83af-100cdd013e3b	hydroxide	1664272192
7089146f-8ea9-4dca-a0ef-942d1da1e28f	f	???	2022-09-17 01:01:35.766+00	{}	4f994517-13bc-43df-a9b2-a10a9f901638	0ced1f9d-2318-4301-83af-100cdd013e3b	hydroxide	1664272192
81c288ae-6979-40e3-8449-f56a46ec0fa9	f	lmao	2022-09-27 22:52:55.349+00	{}	a4256b47-2a18-49c6-a985-430ed913334c	0ced1f9d-2318-4301-83af-100cdd013e3b	hydroxide	1664272192
\.


--
-- Data for Name: app_user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."app_user" ("last_login", "is_superuser", "id", "email", "username", "password", "bio", "following", "followers", "created", "bannerID", "pictureID") FROM stdin;
\N	f	0ced1f9d-2318-4301-83af-100cdd013e3b	hydroxide@gmail.com	hydroxide	pbkdf2_sha256$320000$eoC01atcfnnsHLBIfJ8B7F$fodiIgqAtFW9P7/qbGQQqbyFIKGTUM8BQciMx9fiAZA=	designer of social-infinity. welcome to the WIRED... living in a hydroxide world.	{f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7}	{f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7}	2022-08-30 20:29:29.848154+00	1664269996	1664272192
\N	f	f0c3c0d2-2085-4cd9-9b53-a7ffceb050e7	invisible@gmail.com	invizible	pbkdf2_sha256$320000$MgVjrPowuzK9natZb9fKVy$BbBiPK5qZFu9tT7vohRaO4fCyCY/B8y4JF5uBSUqqBQ=	h3ll0	{0ced1f9d-2318-4301-83af-100cdd013e3b}	{0ced1f9d-2318-4301-83af-100cdd013e3b}	2022-09-19 20:01:54.231+00	1664255866727	1664255866727
\.


--
-- Data for Name: app_user_groups; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."app_user_groups" ("id", "user_id", "group_id") FROM stdin;
\.


--
-- Data for Name: app_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."app_user_user_permissions" ("id", "user_id", "permission_id") FROM stdin;
\.


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."auth_group" ("id", "name") FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."auth_group_permissions" ("id", "group_id", "permission_id") FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."auth_permission" ("id", "name", "content_type_id", "codename") FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	2	add_permission
6	Can change permission	2	change_permission
7	Can delete permission	2	delete_permission
8	Can view permission	2	view_permission
9	Can add group	3	add_group
10	Can change group	3	change_group
11	Can delete group	3	delete_group
12	Can view group	3	view_group
13	Can add content type	4	add_contenttype
14	Can change content type	4	change_contenttype
15	Can delete content type	4	delete_contenttype
16	Can view content type	4	view_contenttype
17	Can add session	5	add_session
18	Can change session	5	change_session
19	Can delete session	5	delete_session
20	Can view session	5	view_session
21	Can add user	6	add_user
22	Can change user	6	change_user
23	Can delete user	6	delete_user
24	Can view user	6	view_user
25	Can add post	7	add_post
26	Can change post	7	change_post
27	Can delete post	7	delete_post
28	Can view post	7	view_post
29	Can add reply	8	add_reply
30	Can change reply	8	change_reply
31	Can delete reply	8	delete_reply
32	Can view reply	8	view_reply
33	Can add notification	9	add_notification
34	Can change notification	9	change_notification
35	Can delete notification	9	delete_notification
36	Can view notification	9	view_notification
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."django_admin_log" ("id", "action_time", "object_id", "object_repr", "action_flag", "change_message", "content_type_id", "user_id") FROM stdin;
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."django_content_type" ("id", "app_label", "model") FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	contenttypes	contenttype
5	sessions	session
6	app	user
7	app	post
8	app	reply
9	app	notification
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."django_migrations" ("id", "app", "name", "applied") FROM stdin;
1	contenttypes	0001_initial	2022-07-05 03:51:24.679126+00
2	contenttypes	0002_remove_content_type_name	2022-07-05 03:51:25.207474+00
3	auth	0001_initial	2022-07-05 03:51:26.821571+00
4	auth	0002_alter_permission_name_max_length	2022-07-05 03:51:27.170382+00
5	auth	0003_alter_user_email_max_length	2022-07-05 03:51:27.524249+00
6	auth	0004_alter_user_username_opts	2022-07-05 03:51:27.868652+00
7	auth	0005_alter_user_last_login_null	2022-07-05 03:51:28.223525+00
8	auth	0006_require_contenttypes_0002	2022-07-05 03:51:28.565053+00
9	auth	0007_alter_validators_add_error_messages	2022-07-05 03:51:28.915998+00
10	auth	0008_alter_user_username_max_length	2022-07-05 03:51:29.257565+00
11	auth	0009_alter_user_last_name_max_length	2022-07-05 03:51:29.608419+00
12	auth	0010_alter_group_name_max_length	2022-07-05 03:51:30.055872+00
13	auth	0011_update_proxy_permissions	2022-07-05 03:51:30.397263+00
14	auth	0012_alter_user_first_name_max_length	2022-07-05 03:51:30.7537+00
19	sessions	0001_initial	2022-07-05 03:51:36.782829+00
22	app	0001_initial	2022-08-27 02:47:07.356418+00
23	admin	0001_initial	2022-08-27 02:47:08.28098+00
24	admin	0002_logentry_remove_auto_add	2022-08-27 02:47:08.586747+00
25	admin	0003_logentry_add_action_flag_choices	2022-08-27 02:47:08.950543+00
26	app	0002_post_image_reply	2022-08-27 02:47:10.127142+00
27	app	0003_post_replies	2022-08-27 02:47:10.579538+00
28	app	0004_alter_post_image_alter_reply_image_alter_user_banner_and_more	2022-08-27 02:47:11.389654+00
29	app	0005_alter_post_image_alter_reply_image_alter_user_banner_and_more	2022-08-27 02:47:11.812448+00
30	app	0006_user_created_notification	2022-08-30 20:29:30.766633+00
31	app	0007_rename_creator_notification_creator_id_and_more	2022-08-30 20:56:38.923398+00
32	app	0008_remove_notification_target_name	2022-08-30 20:58:47.19308+00
33	app	0009_notification_time	2022-08-30 21:27:45.852268+00
34	app	0010_notification_seen	2022-08-31 21:14:06.611931+00
35	app	0011_post_username	2022-09-03 21:21:41.051527+00
36	app	0012_reply_username	2022-09-03 21:22:09.639524+00
37	app	0013_post_userpicture	2022-09-16 03:25:00.01089+00
38	app	0014_remove_post_userpicture	2022-09-16 03:25:00.468631+00
39	app	0015_post_userpicture	2022-09-16 03:25:01.029591+00
40	app	0016_reply_userpicture	2022-09-16 03:33:44.982505+00
41	app	0017_notification_creator_picture	2022-09-16 03:39:22.082221+00
42	app	0018_rename_creator_picture_notification_creatorhaspicture_and_more	2022-09-22 00:18:25.188945+00
43	app	0019_alter_notification_recipientid	2022-09-22 00:31:20.194846+00
44	app	0020_remove_notification_creatorhaspicture_and_more	2022-09-27 05:18:19.398379+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: -
--

COPY "public"."django_session" ("session_key", "session_data", "expire_date") FROM stdin;
\.


--
-- Name: app_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."app_user_groups_id_seq"', 1, false);


--
-- Name: app_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."app_user_user_permissions_id_seq"', 1, false);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."auth_group_id_seq"', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."auth_group_permissions_id_seq"', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."auth_permission_id_seq"', 36, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."django_admin_log_id_seq"', 1, false);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."django_content_type_id_seq"', 9, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"public"."django_migrations_id_seq"', 44, true);


--
-- Name: app_notification app_notification_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."app_notification"
    ADD CONSTRAINT "app_notification_pkey" PRIMARY KEY ("id");


--
-- Name: app_post app_post_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."app_post"
    ADD CONSTRAINT "app_post_pkey" PRIMARY KEY ("id");


--
-- Name: app_reply app_reply_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."app_reply"
    ADD CONSTRAINT "app_reply_pkey" PRIMARY KEY ("id");


--
-- Name: app_user_groups app_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."app_user_groups"
    ADD CONSTRAINT "app_user_groups_pkey" PRIMARY KEY ("id");


--
-- Name: app_user_groups app_user_groups_user_id_group_id_73b8e940_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."app_user_groups"
    ADD CONSTRAINT "app_user_groups_user_id_group_id_73b8e940_uniq" UNIQUE ("user_id", "group_id");


--
-- Name: app_user app_user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."app_user"
    ADD CONSTRAINT "app_user_pkey" PRIMARY KEY ("id");


--
-- Name: app_user_user_permissions app_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."app_user_user_permissions"
    ADD CONSTRAINT "app_user_user_permissions_pkey" PRIMARY KEY ("id");


--
-- Name: app_user_user_permissions app_user_user_permissions_user_id_permission_id_7c8316ce_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."app_user_user_permissions"
    ADD CONSTRAINT "app_user_user_permissions_user_id_permission_id_7c8316ce_uniq" UNIQUE ("user_id", "permission_id");


--
-- Name: app_user app_user_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."app_user"
    ADD CONSTRAINT "app_user_username_key" UNIQUE ("username");


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."auth_group"
    ADD CONSTRAINT "auth_group_name_key" UNIQUE ("name");


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."auth_group_permissions"
    ADD CONSTRAINT "auth_group_permissions_group_id_permission_id_0cd325b0_uniq" UNIQUE ("group_id", "permission_id");


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."auth_group_permissions"
    ADD CONSTRAINT "auth_group_permissions_pkey" PRIMARY KEY ("id");


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."auth_group"
    ADD CONSTRAINT "auth_group_pkey" PRIMARY KEY ("id");


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."auth_permission"
    ADD CONSTRAINT "auth_permission_content_type_id_codename_01ab375a_uniq" UNIQUE ("content_type_id", "codename");


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."auth_permission"
    ADD CONSTRAINT "auth_permission_pkey" PRIMARY KEY ("id");


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."django_admin_log"
    ADD CONSTRAINT "django_admin_log_pkey" PRIMARY KEY ("id");


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."django_content_type"
    ADD CONSTRAINT "django_content_type_app_label_model_76bd3d3b_uniq" UNIQUE ("app_label", "model");


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."django_content_type"
    ADD CONSTRAINT "django_content_type_pkey" PRIMARY KEY ("id");


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."django_migrations"
    ADD CONSTRAINT "django_migrations_pkey" PRIMARY KEY ("id");


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."django_session"
    ADD CONSTRAINT "django_session_pkey" PRIMARY KEY ("session_key");


--
-- Name: app_notification_creator_id_b3d1ebd5; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "app_notification_creator_id_b3d1ebd5" ON "public"."app_notification" USING "btree" ("creatorID_id");


--
-- Name: app_notification_target_id_ec40e651; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "app_notification_target_id_ec40e651" ON "public"."app_notification" USING "btree" ("recipientID_id");


--
-- Name: app_post_user_id_c2bbada6; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "app_post_user_id_c2bbada6" ON "public"."app_post" USING "btree" ("user_id");


--
-- Name: app_reply_origin_id_589ff682; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "app_reply_origin_id_589ff682" ON "public"."app_reply" USING "btree" ("origin_id");


--
-- Name: app_reply_user_id_9166edce; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "app_reply_user_id_9166edce" ON "public"."app_reply" USING "btree" ("user_id");


--
-- Name: app_user_groups_group_id_e774d92c; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "app_user_groups_group_id_e774d92c" ON "public"."app_user_groups" USING "btree" ("group_id");


--
-- Name: app_user_groups_user_id_e6f878f6; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "app_user_groups_user_id_e6f878f6" ON "public"."app_user_groups" USING "btree" ("user_id");


--
-- Name: app_user_user_permissions_permission_id_4ef8e133; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "app_user_user_permissions_permission_id_4ef8e133" ON "public"."app_user_user_permissions" USING "btree" ("permission_id");


--
-- Name: app_user_user_permissions_user_id_24780b52; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "app_user_user_permissions_user_id_24780b52" ON "public"."app_user_user_permissions" USING "btree" ("user_id");


--
-- Name: app_user_username_9d6296ff_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "app_user_username_9d6296ff_like" ON "public"."app_user" USING "btree" ("username" "varchar_pattern_ops");


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "auth_group_name_a6ea08ec_like" ON "public"."auth_group" USING "btree" ("name" "varchar_pattern_ops");


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "auth_group_permissions_group_id_b120cbf9" ON "public"."auth_group_permissions" USING "btree" ("group_id");


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "auth_group_permissions_permission_id_84c5c92e" ON "public"."auth_group_permissions" USING "btree" ("permission_id");


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "auth_permission_content_type_id_2f476e4b" ON "public"."auth_permission" USING "btree" ("content_type_id");


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "django_admin_log_content_type_id_c4bce8eb" ON "public"."django_admin_log" USING "btree" ("content_type_id");


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "django_admin_log_user_id_c564eba6" ON "public"."django_admin_log" USING "btree" ("user_id");


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "django_session_expire_date_a5c62663" ON "public"."django_session" USING "btree" ("expire_date");


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "django_session_session_key_c0390e0f_like" ON "public"."django_session" USING "btree" ("session_key" "varchar_pattern_ops");


--
-- Name: app_notification app_notification_creatorID_id_c3aaa6c3_fk_app_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."app_notification"
    ADD CONSTRAINT "app_notification_creatorID_id_c3aaa6c3_fk_app_user_id" FOREIGN KEY ("creatorID_id") REFERENCES "public"."app_user"("id") DEFERRABLE INITIALLY DEFERRED;


--
-- Name: app_notification app_notification_recipientID_id_5825dcc2_fk_app_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."app_notification"
    ADD CONSTRAINT "app_notification_recipientID_id_5825dcc2_fk_app_user_id" FOREIGN KEY ("recipientID_id") REFERENCES "public"."app_user"("id") DEFERRABLE INITIALLY DEFERRED;


--
-- Name: app_post app_post_user_id_c2bbada6_fk_app_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."app_post"
    ADD CONSTRAINT "app_post_user_id_c2bbada6_fk_app_user_id" FOREIGN KEY ("user_id") REFERENCES "public"."app_user"("id") DEFERRABLE INITIALLY DEFERRED;


--
-- Name: app_reply app_reply_origin_id_589ff682_fk_app_post_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."app_reply"
    ADD CONSTRAINT "app_reply_origin_id_589ff682_fk_app_post_id" FOREIGN KEY ("origin_id") REFERENCES "public"."app_post"("id") DEFERRABLE INITIALLY DEFERRED;


--
-- Name: app_reply app_reply_user_id_9166edce_fk_app_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."app_reply"
    ADD CONSTRAINT "app_reply_user_id_9166edce_fk_app_user_id" FOREIGN KEY ("user_id") REFERENCES "public"."app_user"("id") DEFERRABLE INITIALLY DEFERRED;


--
-- Name: app_user_groups app_user_groups_group_id_e774d92c_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."app_user_groups"
    ADD CONSTRAINT "app_user_groups_group_id_e774d92c_fk_auth_group_id" FOREIGN KEY ("group_id") REFERENCES "public"."auth_group"("id") DEFERRABLE INITIALLY DEFERRED;


--
-- Name: app_user_groups app_user_groups_user_id_e6f878f6_fk_app_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."app_user_groups"
    ADD CONSTRAINT "app_user_groups_user_id_e6f878f6_fk_app_user_id" FOREIGN KEY ("user_id") REFERENCES "public"."app_user"("id") DEFERRABLE INITIALLY DEFERRED;


--
-- Name: app_user_user_permissions app_user_user_permis_permission_id_4ef8e133_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."app_user_user_permissions"
    ADD CONSTRAINT "app_user_user_permis_permission_id_4ef8e133_fk_auth_perm" FOREIGN KEY ("permission_id") REFERENCES "public"."auth_permission"("id") DEFERRABLE INITIALLY DEFERRED;


--
-- Name: app_user_user_permissions app_user_user_permissions_user_id_24780b52_fk_app_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."app_user_user_permissions"
    ADD CONSTRAINT "app_user_user_permissions_user_id_24780b52_fk_app_user_id" FOREIGN KEY ("user_id") REFERENCES "public"."app_user"("id") DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."auth_group_permissions"
    ADD CONSTRAINT "auth_group_permissio_permission_id_84c5c92e_fk_auth_perm" FOREIGN KEY ("permission_id") REFERENCES "public"."auth_permission"("id") DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."auth_group_permissions"
    ADD CONSTRAINT "auth_group_permissions_group_id_b120cbf9_fk_auth_group_id" FOREIGN KEY ("group_id") REFERENCES "public"."auth_group"("id") DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."auth_permission"
    ADD CONSTRAINT "auth_permission_content_type_id_2f476e4b_fk_django_co" FOREIGN KEY ("content_type_id") REFERENCES "public"."django_content_type"("id") DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."django_admin_log"
    ADD CONSTRAINT "django_admin_log_content_type_id_c4bce8eb_fk_django_co" FOREIGN KEY ("content_type_id") REFERENCES "public"."django_content_type"("id") DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_app_user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "public"."django_admin_log"
    ADD CONSTRAINT "django_admin_log_user_id_c564eba6_fk_app_user_id" FOREIGN KEY ("user_id") REFERENCES "public"."app_user"("id") DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

