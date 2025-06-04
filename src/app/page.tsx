"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Github,
  MapPin,
  Calendar,
  Users,
  BookOpen,
  Star,
  GitFork,
  ExternalLink,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { LuGithub } from "react-icons/lu";


interface GitHubUser {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  location: string | null
  public_repos: number
  followers: number
  following: number
  created_at: string
  html_url: string
  company: string | null
  blog: string | null
  twitter_username: string | null
}

interface Repository {
  name: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  html_url: string
}

export default function EnhancedGitHubExplorer() {
  const [username, setUsername] = useState("")
  const [userData, setUserData] = useState<GitHubUser | null>(null)
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!username.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const [userResponse, reposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=6`),
      ])

      if (!userResponse.ok) {
        throw new Error("User not found")
      }

      const userData = await userResponse.json()
      const reposData = await reposResponse.json()

      setUserData(userData)
      setRepositories(reposData)
      setIsDialogOpen(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-sm bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <LuGithub className="h-8 w-8 text-white" />
                <span className="text-white font-bold text-xl font-monasans">GitExplorer</span>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-centerjustify-between w-full">
              <div className="flex items-center space-x-2">
                <Github className="h-6 w-6 text-white" />
                <span className="text-white font-bold font-monasans">GitExplorer</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="font-monasans text-bold text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Discover, Explore, and Connect with{" "}
              <span className="font-monasans text-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                GitHub Profiles
              </span>{" "}
              in an Instant
            </h1>
            <p className="text-md sm:text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Join the world's most widely adopted AI-powered developer platform and explore amazing GitHub profiles.
            </p>

            {/* Search Section */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <div className="relative flex-1 w-full sm:w-auto">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter GitHub username..."
                    className="pl-12 h-14 font-monasans text-sm sm:text-lg bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm"
                    disabled={isLoading}
                  />
                </div>
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading || !username.trim()}
                  className="h-14 px-8 bg-green-600 hover:bg-green-700 text-white font-semibold"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-5 w-5" />
                      <span className="font-monasans">Search Profile</span>
                    </>
                  )}
                </Button>
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-300">
                  <AlertCircle className="h-5 w-5" />
                  <span>{error}</span>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Enhanced Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl font-monasans max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{userData?.name || userData?.login}</DialogTitle>
            <DialogDescription className="text-md">@{userData?.login}</DialogDescription>
          </DialogHeader>

          {userData && (
            <div className="space-y-6 font-monasans">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <Image
                    src={userData.avatar_url || "/placeholder.svg"}
                    alt={`${userData.login}'s avatar`}
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-gray-200"
                  />
                </div>

                <div className="flex-1 space-y-4">
                  {userData.bio && <p className="text-gray-700 text-md sm:text-lg">{userData.bio}</p>}

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {userData.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{userData.location}</span>
                      </div>
                    )}
                    {userData.company && (
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{userData.company}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {formatDate(userData.created_at)}</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button asChild>
                      <a
                        href={userData.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View on GitHub
                      </a>
                    </Button>
                    {userData.blog && (
                      <Button variant="outline" asChild>
                        <a
                          href={userData.blog.startsWith("http") ? userData.blog : `https://${userData.blog}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit Website
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-black font-monasans">{userData.public_repos}</div>
                    <div className="text-xs sm:text-sm text-center text-gray-600">Repositories</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-black font-monasans">{userData.followers}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Followers</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-black font-monasans">{userData.following}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Following</div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Repositories */}
              {repositories.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex font-monasans items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      <span className="font-monasans">Top Repositories</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {repositories.map((repo) => (
                        <Card key={repo.name} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <div className="flex items-start justify-between">
                                <h4 className="font-semibold text-blue-600 hover:underline">
                                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                    {repo.name}
                                  </a>
                                </h4>
                                <ExternalLink className="h-4 w-4 text-gray-400" />
                              </div>
                              {repo.description && (
                                <p className="text-sm text-gray-600 line-clamp-2">{repo.description}</p>
                              )}
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                {repo.language && <Badge variant="secondary">{repo.language}</Badge>}
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3" />
                                  <span>{repo.stargazers_count}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <GitFork className="h-3 w-3" />
                                  <span>{repo.forks_count}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
