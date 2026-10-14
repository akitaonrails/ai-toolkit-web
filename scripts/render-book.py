# Renders the book page's 3D mockup of Fabio Akita's book (~/Projects/ai-book-2026) from its official cover, in
# Blender, headless:
#   blender -b -P scripts/render-book.py -- <cover.png> <out.png> "<SPINE TITLE>" <print pages> [book-repo]
# The model is a 6 x 9 in paperback as thick as the print edition: about 0.0025 in per page (pages from pdfinfo on
# the release's print PDF, the same numbers as src/data/book.ts). The spine is drawn here from the cover's own colors and title face (Limelight,
# cream on navy, from the book repo's scripts/compose_cover.rb), so no image model ever redraws the cover.
# Output: a transparent PNG with a soft floor shadow. docs/images.md, "Book".
import bpy, math, sys, os, subprocess, tempfile

args = sys.argv[sys.argv.index('--') + 1:]
cover, out, title, pages = args[0], args[1], args[2], int(args[3])
repo = os.path.expanduser(args[4] if len(args) > 4 else '~/Projects/ai-book-2026')
W, H, T = 6.0, 9.0, pages * 0.0025   # inches: width, height, thickness
BOARD = 0.025                     # cover stock
NAVY, CREAM = '#0E2433', '#F4E9D0'

# Spine image: same pixel density as the 1600 x 2560 cover, title top to bottom, author at the foot.
tmp = tempfile.mkdtemp()
spine = os.path.join(tmp, 'spine.png')
sw, sh = round(1600 * T / W), 2560
fonts = os.path.join(repo, 'assets/fonts')
# The title fills the spine's width, but never so long that it runs into the author at the foot: about 62% of the
# spine's length is free for it, and a Limelight capital is about 0.75 em wide.
title_pt = min(sw * 0.42, sh * 0.62 / (len(title) * 0.75))
subprocess.run(['magick', '-size', f'{sh}x{sw}', f'xc:{NAVY}',
  '-font', os.path.join(fonts, 'Limelight-Regular.ttf'), '-pointsize', str(round(title_pt)), '-fill', CREAM,
  '-gravity', 'west', '-annotate', f'+{round(sh * 0.06)}+0', title,
  '-font', os.path.join(fonts, 'NotoSans-SemiBold.ttf'), '-pointsize', str(round(sw * 0.2)), '-kerning', '6',
  '-gravity', 'east', '-annotate', f'+{round(sh * 0.05)}+0', 'FABIO AKITA',
  '-rotate', '90', spine], check=True)

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

def hexrgb(h):
  h = h.lstrip('#'); return tuple((int(h[i:i + 2], 16) / 255) ** 2.2 for i in (0, 2, 4)) + (1,)

def image_material(name, path, rough=0.45, spec=0.5):
  m = bpy.data.materials.new(name); m.use_nodes = True
  nt = m.node_tree; bsdf = next(n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED')
  tex = nt.nodes.new('ShaderNodeTexImage'); tex.image = bpy.data.images.load(path); tex.extension = 'EXTEND'
  nt.links.new(tex.outputs['Color'], bsdf.inputs['Base Color'])
  bsdf.inputs['Roughness'].default_value = rough
  bsdf.inputs['Specular IOR Level'].default_value = spec
  return m

def flat_material(name, color, rough=0.5):
  m = bpy.data.materials.new(name); m.use_nodes = True
  bsdf = next(n for n in m.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')
  bsdf.inputs['Base Color'].default_value = hexrgb(color); bsdf.inputs['Roughness'].default_value = rough
  return m

def pages_material():
  # Cream paper with fine bands across the thickness: the stacked page edges.
  m = bpy.data.materials.new('pages'); m.use_nodes = True
  nt = m.node_tree; bsdf = next(n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED')
  coord = nt.nodes.new('ShaderNodeTexCoord')
  wave = nt.nodes.new('ShaderNodeTexWave'); wave.wave_type = 'BANDS'; wave.bands_direction = 'Y'
  wave.inputs['Scale'].default_value = 90; wave.inputs['Distortion'].default_value = 1.5
  ramp = nt.nodes.new('ShaderNodeValToRGB')
  ramp.color_ramp.elements[0].color = hexrgb('#D9CDB2'); ramp.color_ramp.elements[1].color = hexrgb('#F7F0E1')
  nt.links.new(coord.outputs['Object'], wave.inputs['Vector'])
  nt.links.new(wave.outputs['Fac'], ramp.inputs['Fac'])
  nt.links.new(ramp.outputs['Color'], bsdf.inputs['Base Color'])
  bsdf.inputs['Roughness'].default_value = 0.85
  return m

def plane(name, size, location, rotation, material):
  bpy.ops.mesh.primitive_plane_add(size=1, location=location, rotation=rotation)
  o = bpy.context.object; o.name = name; o.scale = (*size, 1)
  o.data.materials.append(material)
  return o

def box(name, dims, location, material):
  bpy.ops.mesh.primitive_cube_add(size=1, location=location)
  o = bpy.context.object; o.name = name; o.scale = dims
  o.data.materials.append(material)
  return o

r90 = math.radians(90)
# The book stands upright on the floor (z = 0), front cover facing -Y, spine on the left (-X).
z = H / 2
plane('front', (W, H), (0, -T / 2, z), (r90, 0, 0), image_material('cover', cover, 0.35))
box('back', (W, BOARD, H), (0, T / 2 - BOARD / 2, z), flat_material('back', NAVY))
plane('spine', (T, H), (-W / 2, 0, z), (r90, 0, -r90), image_material('spine', spine, 0.8, 0.15))
box('pages', (W - 0.04, T - 2 * BOARD, H - 0.06), (0.02, 0, z), pages_material())

# Floor that only catches the shadow, so the PNG stays transparent around the book.
bpy.ops.mesh.primitive_plane_add(size=60, location=(0, 0, 0))
bpy.context.object.is_shadow_catcher = True

# Lights: a large soft key from the front left and above, a fill from the right, a dim world.
def area(name, loc, size, power):
  bpy.ops.object.light_add(type='AREA', location=loc)
  l = bpy.context.object; l.name = name; l.data.size = size; l.data.energy = power
  d = -l.location; l.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler()
area('key', (-6, -14, 14), 10, 7000)
area('fill', (12, -8, 6), 8, 2500)
area('rim', (-4, 10, 12), 6, 1500)
scene.world = bpy.data.worlds.new('world'); scene.world.use_nodes = True
scene.world.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.25

# Camera: three-quarter view from the spine side, a little above, long lens for gentle perspective.
bpy.ops.object.camera_add(location=(-15, -30, 17))
cam = bpy.context.object; cam.data.lens = 85; scene.camera = cam
target = bpy.data.objects.new('target', None); target.location = (0.15, 0, H / 2 - 0.2); scene.collection.objects.link(target)
track = cam.constraints.new('TRACK_TO'); track.target = target; track.track_axis = 'TRACK_NEGATIVE_Z'; track.up_axis = 'UP_Y'

scene.render.engine = 'CYCLES'
scene.cycles.samples = 128
scene.cycles.use_denoising = True
scene.render.film_transparent = True
scene.render.resolution_x, scene.render.resolution_y = 1400, 1600
scene.render.image_settings.file_format = 'PNG'
scene.render.image_settings.color_mode = 'RGBA'
scene.view_settings.view_transform = 'Standard'   # keep the cover's colors as printed
scene.render.filepath = out
bpy.ops.render.render(write_still=True)
print('wrote', out)
