# Infrastructure Automation

This repository now includes Terraform for working against the existing Azure environment and Ansible for VM configuration and application deployment.

The current setup targets the existing Azure resource group `devops`, virtual network `devops-vnet`, subnet `default`, network interface `devops225_z1`, VM `devops`, and public IP `172.160.248.100`.

## What Terraform Reads

Terraform reads the existing Azure resources needed for deployment:

- Resource group `devops`
- Virtual network `devops-vnet`
- Subnet `default`
- Network interface `devops225_z1`
- Linux virtual machine `devops`

The public IP for the VM is treated as an existing target address: `172.160.248.100`.

## What Ansible Does

Ansible prepares the VM and deploys the application:

- Installs Docker and the Docker Compose plugin
- Installs Git and supporting packages
- Starts the Docker service
- Clones the repository onto the VM
- Writes the runtime `.env` file on the VM
- Runs `docker compose up -d --build`

The current application already uses Docker Compose, so the VM deployment is container-based rather than installing Java, Node.js, or PostgreSQL directly on the host.

## Prerequisites

- Azure CLI authenticated to the target subscription
- Terraform installed locally
- Ansible installed locally
- An SSH public/private key pair

## Terraform Workflow

1. Go to the Terraform directory.

```bash
cd infra/terraform
```

2. Copy the example variables file and fill in your values.

```bash
cp terraform.tfvars.example terraform.tfvars
```

3. Edit `terraform.tfvars` if needed. For the current environment, keep the existing names and IP values.

4. Initialize Terraform.

```bash
terraform init
```

5. Review the plan.

```bash
terraform plan
```

6. Apply the configuration.

```bash
terraform apply
```

7. Review the outputs to confirm Terraform can see the existing Azure resources.

## Ansible Workflow

1. Go to the Ansible directory.

```bash
cd infra/ansible
```

2. Copy the inventory example and keep it pointed at the current VM IP.

```bash
cp inventory.ini.example inventory.ini
```

3. Copy the variable example and provide the repository URL, branch, and secret values.

```bash
mkdir group_vars
cp group_vars/all.example.yml group_vars/all.yml
```

4. Run the playbook.

```bash
ansible-playbook -i inventory.ini site.yml
```

## Secret Handling

- Do not commit `infra/terraform/terraform.tfvars`
- Do not commit `infra/ansible/inventory.ini`
- Do not commit `infra/ansible/group_vars/all.yml`
- Use Ansible Vault if you want to store sensitive values in encrypted form

## Repeating From a Clean Environment

To repeat the deployment on the same host, rerun `ansible-playbook` after any VM reset or application update.

If the Azure resources are recreated later, update the names and IPs in the Terraform variables and inventory first.

## Notes

- The current Ansible playbook assumes the repository is reachable from the VM.
- If you later move secrets into Azure Key Vault, the playbook can be extended to fetch them at deploy time.