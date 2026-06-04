"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  ExternalLink,
  Image as ImageIcon,
  Loader2,
  X
} from "lucide-react";
import { GitHubIcon } from "@/components/GitHubIcon";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Project {
  id: string;
  title: string;
  short_description: string;
  description: string;
  tech_stack: string[];
  image_url: string;
  project_url: string;
  github_url: string;
  category: string;
  featured: boolean;
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [techInput, setTechInput] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    short_description: "",
    description: "",
    tech_stack: [] as string[],
    image_url: "",
    project_url: "",
    github_url: "",
    category: "",
    featured: false,
  });

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/admin/login");
      return;
    }
    setUser(user);
    fetchProjects();
  };

  const fetchProjects = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    setProjects(data || []);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title || "",
        short_description: project.short_description || "",
        description: project.description || "",
        tech_stack: project.tech_stack || [],
        image_url: project.image_url || "",
        project_url: project.project_url || "",
        github_url: project.github_url || "",
        category: project.category || "",
        featured: project.featured || false,
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        short_description: "",
        description: "",
        tech_stack: [],
        image_url: "",
        project_url: "",
        github_url: "",
        category: "",
        featured: false,
      });
    }
    setShowModal(true);
    setError("");
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
    setTechInput("");
    setError("");
  };

  const addTech = () => {
    if (techInput.trim() && !formData.tech_stack.includes(techInput.trim())) {
      setFormData({ ...formData, tech_stack: [...formData.tech_stack, techInput.trim()] });
      setTechInput("");
    }
  };

  const removeTech = (tech: string) => {
    setFormData({ ...formData, tech_stack: formData.tech_stack.filter(t => t !== tech) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (editingProject) {
        // Update existing project
        const { error } = await supabase
          .from("projects")
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingProject.id);

        if (error) throw error;
      } else {
        // Create new project
        const { error } = await supabase
          .from("projects")
          .insert([formData]);

        if (error) throw error;
      }

      closeModal();
      fetchProjects();
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat menyimpan.");
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus project ini?")) return;

    setDeletingId(id);
    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);

      if (error) throw error;

      fetchProjects();
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat menghapus.");
    }
    setDeletingId(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Keluar
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Toolbar */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Project</h2>
              <p className="text-muted-foreground">Kelola project portfolio kamu</p>
            </div>
            <Button onClick={() => openModal()}>
              <Plus className="mr-2 h-4 w-4" /> Tambah Project
            </Button>
          </div>

          {/* Error Alert */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6"
              >
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Projects Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : projects.length === 0 ? (
            <Card className="py-20 text-center">
              <CardContent>
                <p className="text-muted-foreground">Belum ada project. Tambahkan yang pertama!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card className="overflow-hidden">
                    <div className="aspect-video w-full bg-muted">
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
                        </div>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {project.short_description || "Tidak ada deskripsi"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 flex flex-wrap gap-1">
                        {project.tech_stack?.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-secondary/10 px-2 py-0.5 text-xs text-secondary"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech_stack && project.tech_stack.length > 3 && (
                          <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                            +{project.tech_stack.length - 3}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {project.project_url && (
                            <a
                              href={project.project_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <GitHubIcon className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openModal(project)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(project.id)}
                            disabled={deletingId === project.id}
                            className="text-destructive hover:text-destructive"
                          >
                            {deletingId === project.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? "Edit Project" : "Tambah Project Baru"}
            </DialogTitle>
            <DialogDescription>
              {editingProject ? "Perbarui informasi project" : "Tambahkan project baru ke portfolio"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Judul Project *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Nama project kamu"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="short_description">Deskripsi Singkat *</Label>
              <Input
                id="short_description"
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                placeholder="Ringkasan singkat untuk card (maks 100 karakter)"
                maxLength={100}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi Lengkap</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Deskripsi detail project kamu"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">URL Gambar</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://contoh.com/gambar.jpg"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="project_url">URL Project</Label>
                <Input
                  id="project_url"
                  value={formData.project_url}
                  onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                  placeholder="https://project-kamu.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github_url">URL GitHub</Label>
                <Input
                  id="github_url"
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Kategori</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Web, Mobile, Desktop, dll"
              />
            </div>

            <div className="space-y-2">
              <Label>Tech Stack</Label>
              <div className="flex gap-2">
                <Input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="React, Node.js, dll"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTech();
                    }
                  }}
                />
                <Button type="button" variant="secondary" onClick={addTech}>
                  Tambah
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {formData.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-3 py-1 text-sm"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTech(tech)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="featured">Tampilkan di homepage</Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeModal}>
                Batal
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? "Menyimpan..." : editingProject ? "Perbarui" : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}