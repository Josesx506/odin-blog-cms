'use client';

import { axiosApi } from "@/api/axios";
import styles from '@/styles/landingpage.module.css';
import Link from "next/link";
import { useEffect, useState } from "react";
import { ContainedButton } from "./Buttons";
import PostThumbnail from "./posts/PostThumbnail";

function FreeLandingPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    async function getData() {
      try {
        const resp = await axiosApi.get(`${process.env.NEXT_PUBLIC_EXPRESSURL}/v1/freemium`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
          signal: controller.signal,
        })
        setPosts(resp.data.posts)
      } catch (err) {
        // console.error(err)
      }
    }
    getData();

    return () => { controller.abort() };
  }, [])

  return (
    <div className={styles.pageContainer}>
      {posts.map(post => {
        return <PostThumbnail key={post.id} {...post} />
      })}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ContainedButton>
          <Link href={'/posts'}>View More <span>&#9662;</span></Link>
        </ContainedButton>
      </div>
    </div>
  )
}

export default function AuthenticatedLandingPage() {
  // Current date for greeting
  const currentHour = new Date().getHours()
  let greeting = "Good morning"
  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon"
  } else if (currentHour >= 17) {
    greeting = "Good evening"
  }

  return (
    <div className={styles.pageContainer}>
      {/* Welcome Section */}
      <section className={styles.welcomeSection}>
        <h1 className={styles.welcomeTitle}>{greeting}!</h1>
        <p>Welcome to your personalized blog experience. Discover new content or browse your favorite topics.</p>
        <div className={styles.buttonContainer}>
          <ContainedButton>
            <Link href="/posts">Browse All Posts</Link>
          </ContainedButton>
        </div>
      </section>

      {/* Quick Links Section */}
      <section>
        <h2 className={styles.sectionTitle}>Quick Links</h2>
        <div className={styles.quickLinksGrid}>
          <QuickLinkCard
            title="Latest Articles"
            description="Check out our newest content and stay up to date"
            icon="📰"
            link="/posts"
          />
          <QuickLinkCard
            title="Categories"
            description="Browse articles by topic and find what interests you"
            icon="🗂️"
            link="#"//-/categories
          />
          <QuickLinkCard
            title="Your Profile"
            description="Manage your account settings and preferences"
            icon="👤"
            link="#"//-/profile
          />
        </div>
      </section>

      {/* Featured Content Section */}
      <section>
        <h2 className={styles.sectionTitle}>Featured Content</h2>
        <div className={styles.featuredGrid}>
          <FeaturedCard
            title="Getting Started Guide"
            description="Learn how to make the most of our platform with this comprehensive guide"
            link="/posts?tag=getting-started"
          />
          <FeaturedCard
            title="Top Articles This Month"
            description="Discover the most popular content that other readers are enjoying"
            link="/posts?tag=popular"
          />
          <FeaturedCard
            title="Editor's Picks"
            description="Hand-selected articles our editorial team thinks you'll love"
            link="/posts?tag=editors-picks"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to explore?</h2>
        <p className={styles.ctaDescription}>
          Our collection of articles is constantly growing. Find something that sparks your interest!
        </p>
        <ContainedButton>
          <Link href="/posts">View All Articles</Link>
        </ContainedButton>
      </section>
    </div>
  )
}

// Helper component for quick link cards
function QuickLinkCard({ title, description, icon, link }) {
  return (
    <Link href={link} className={styles.linkReset}>
      <div className={styles.quickLinkCard}>
        <div className={styles.cardIcon}>{icon}</div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
        <div className={styles.cardLink}>
          Explore <span className={styles.cardLinkArrow}>→</span>
        </div>
      </div>
    </Link>
  )
}

// Helper component for featured content cards
function FeaturedCard({ title, description, link }) {
  return (
    <div className={styles.featuredCard}>
      <div className={styles.featuredImagePlaceholder}>Featured</div>
      <div className={styles.featuredContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
        <Link href={link} className={styles.cardLink}>
          Read More <span className={styles.cardLinkArrow}>→</span>
        </Link>
      </div>
    </div>
  )
}


export { AuthenticatedLandingPage, FreeLandingPage };
