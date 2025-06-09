--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: update_user_average_grade(); Type: FUNCTION; Schema: public; Owner: ven
--

CREATE FUNCTION public.update_user_average_grade() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE users
    SET average_grade = (
        SELECT AVG(grade)
        FROM grades
        WHERE users_id = NEW.users_id
    )
    WHERE id = NEW.users_id;

    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_user_average_grade() OWNER TO ven;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: exams; Type: TABLE; Schema: public; Owner: ven
--

CREATE TABLE public.exams (
    exam_id integer NOT NULL,
    class_id numeric NOT NULL,
    date timestamp without time zone NOT NULL,
    class_name character varying NOT NULL
);


ALTER TABLE public.exams OWNER TO ven;

--
-- Name: exams_exam_id_seq; Type: SEQUENCE; Schema: public; Owner: ven
--

CREATE SEQUENCE public.exams_exam_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.exams_exam_id_seq OWNER TO ven;

--
-- Name: exams_exam_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ven
--

ALTER SEQUENCE public.exams_exam_id_seq OWNED BY public.exams.exam_id;


--
-- Name: grades; Type: TABLE; Schema: public; Owner: ven
--

CREATE TABLE public.grades (
    users_id numeric NOT NULL,
    grade numeric NOT NULL,
    subject_id numeric NOT NULL,
    grade_id integer NOT NULL,
    time_placed timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.grades OWNER TO ven;

--
-- Name: grades_grade_id_seq; Type: SEQUENCE; Schema: public; Owner: ven
--

CREATE SEQUENCE public.grades_grade_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.grades_grade_id_seq OWNER TO ven;

--
-- Name: grades_grade_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ven
--

ALTER SEQUENCE public.grades_grade_id_seq OWNED BY public.grades.grade_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: ven
--

CREATE TABLE public.users (
    id integer NOT NULL,
    login text NOT NULL,
    password text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    token character varying(64),
    average_grade bigint NOT NULL,
    class bigint NOT NULL
);


ALTER TABLE public.users OWNER TO ven;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: ven
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO ven;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ven
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: exams exam_id; Type: DEFAULT; Schema: public; Owner: ven
--

ALTER TABLE ONLY public.exams ALTER COLUMN exam_id SET DEFAULT nextval('public.exams_exam_id_seq'::regclass);


--
-- Name: grades grade_id; Type: DEFAULT; Schema: public; Owner: ven
--

ALTER TABLE ONLY public.grades ALTER COLUMN grade_id SET DEFAULT nextval('public.grades_grade_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: ven
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: exams; Type: TABLE DATA; Schema: public; Owner: ven
--

COPY public.exams (exam_id, class_id, date, class_name) FROM stdin;
5	103	2025-06-11 09:30:00	science
4	102	2025-06-12 10:00:00	math
\.


--
-- Data for Name: grades; Type: TABLE DATA; Schema: public; Owner: ven
--

COPY public.grades (users_id, grade, subject_id, grade_id, time_placed) FROM stdin;
3	65	102	9	2025-06-05 19:36:30.099302
3	80	100	5	2025-06-03 13:08:59.489279
3	90	100	6	2025-06-03 13:09:05.647098
3	70	100	8	2025-06-03 13:09:14.290937
5	90	100	10	2025-06-05 19:37:15.194027
3	90	100	7	2025-05-27 13:09:09.098
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: ven
--

COPY public.users (id, login, password, created_at, token, average_grade, class) FROM stdin;
5	venoosoo2	$2a$10$QZ.m7HGOTWtoie6XUahpyuxE89Yk5mN8qwl9ifjMIY.jJCuqyPj56	2025-06-05 19:34:57.957064	$2a$10$6pN0AYekVqCkmpYvBUOxl.plJaSS.oIOP7xMFe/3R0oneoSJos4XC	90	103
4	venoosoo	$2a$10$IHPIjXVDhPIDOV9SYAlTnOcA6Twhi7fV3E9awQivzK05AxLW/h0MO	2025-06-03 14:42:09.802438	$2a$10$VE6DW2o67BbIc8Pioq8H7.fSYvlxTHKpoQ1uQpZaB.VCZQ3yVVrPC	0	103
6	venoosoo50	$2a$10$diRFXXPUK4CMOGcLc3b0Geo8nvEjfHKjvFAz8TwNqI5nSz/nXh31e	2025-06-09 21:13:08.312437	$2a$10$ay4gyVnZbqnQJkLPd7wcG.MVerp0Sz5g7N7u.5DCCImGtL1dTrZzW	0	102
3	venoosoo23	$2a$10$s1qU9P4RDYrTTW9sG2vvou69lXGW6xUKNGgA1XI92vhnXQtKUPSem	2025-06-03 12:30:44.883174	$2a$10$9CMRvvdREI/ANlfX23r6VesvmuwdRuIb8L2Lyb9042y2B7AnDgskW	79	102
\.


--
-- Name: exams_exam_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ven
--

SELECT pg_catalog.setval('public.exams_exam_id_seq', 5, true);


--
-- Name: grades_grade_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ven
--

SELECT pg_catalog.setval('public.grades_grade_id_seq', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ven
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: exams exams_pk; Type: CONSTRAINT; Schema: public; Owner: ven
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_pk PRIMARY KEY (exam_id);


--
-- Name: grades grades_pk; Type: CONSTRAINT; Schema: public; Owner: ven
--

ALTER TABLE ONLY public.grades
    ADD CONSTRAINT grades_pk PRIMARY KEY (grade_id);


--
-- Name: users users__login_unique; Type: CONSTRAINT; Schema: public; Owner: ven
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users__login_unique UNIQUE (login);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: ven
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: idx_users_token; Type: INDEX; Schema: public; Owner: ven
--

CREATE UNIQUE INDEX idx_users_token ON public.users USING btree (token);


--
-- Name: grades trg_update_average; Type: TRIGGER; Schema: public; Owner: ven
--

CREATE TRIGGER trg_update_average AFTER INSERT OR DELETE OR UPDATE ON public.grades FOR EACH ROW EXECUTE FUNCTION public.update_user_average_grade();


--
-- PostgreSQL database dump complete
--

