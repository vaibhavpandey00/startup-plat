import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(`
    *[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search ] | order(_createdAt desc){
    _id, 
    title, 
    slug, 
    _createdAt, 
    author -> {
      _id,
      name,
      image,
      bio,
      userName
    }, 
    views,
    description, 
    category, 
    image
    }`);

export const STARTUP_BY_ID_QUERY = defineQuery(`
  *[_type == "startup" && _id == $id][0]{
  _id, 
    title, 
    slug, 
    _createdAt, 
    author -> {
      _id,
      name,
      userName,
      image,
      bio
    }, 
    views,
    description, 
    category, 
    image,
    pitch
}`);

export const GET_POST_VIEWS_QUERY = defineQuery(`
  *[_type == "startup" && _id == $id][0]{
  views
}`);

export const AUTHOR_BY_GITHUB_QUERY = defineQuery(`
  *[_type == "author" && id == $id][0]{
  _id,
  id,
  name,
  userName,
  email,
  image,
  bio
  }
  `)

export const USER_BY_ID_QUERY = defineQuery(`
  *[_type == "author" && _id == $id][0]{
  _id,
  id,
  name,
  userName,
  email,
  image,
  bio
  }
  `)

export const STARTUPS_BY_AUTHOR_QUERY = defineQuery(`*[_type == "startup" && author._ref == $id] | order(_createdAt desc) {
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  }, 
  views,
  description,
  category,
  image,
}`);

export const PLAYLIST_BY_SLUG_QUERY = defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);