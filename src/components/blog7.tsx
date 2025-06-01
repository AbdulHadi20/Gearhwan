import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface Post {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
}

interface Blog7Props {
  posts: Post[];
}

const Blog7 = ({
  posts = [],
}: Blog7Props) => {
  return (
    <section className="py-32">
      <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-6">
            Latest Updates
          </Badge>
          <h2 className="mb-3 text-2xl md:mb-4 md:text-3xl lg:mb-6 lg:max-w-3xl lg:text-4xl font-bold uppercase">
            Blog Posts
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map((post) => (
            <Card key={post.id} className="grid grid-rows-[auto_auto_1fr_auto] bg-accent">
              <div className="aspect-[16/9] w-full">
                <a
                  href={post.url}
                  target="_blank"
                  className="transition-opacity duration-200 fade-in hover:opacity-70"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover object-center"
                  />
                </a>
              </div>
              <CardHeader>
                <h3 className="text-lg font-semibold hover:underline md:text-xl text-secondary uppercase">
                  <a href={post.url} target="_blank">
                    {post.title}
                  </a>
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-destructive text-wrap">{post.summary}</p>
              </CardContent>
              <CardFooter>
                <a
                  href={post.url}
                  target="_blank"
                  className="flex items-center text-secondary hover:underline"
                >
                  Read more
                  <ArrowRight className="ml-2 size-4" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Blog7 };
